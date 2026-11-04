import convert from 'xml-js'
import {
  convertStringToOFXHeader,
  jsonToBank,
  jsonToBankMessages,
  StringToOFXSignonMessageSetConverter,
} from './converters'
import type { Bank, BankMessage, OFXHeader, SignonMessageSet } from './types'

/**
 * OFXParser
 *
 * Wrapper class that encapsulates the steps required to parse an OFX file:
 *  - extract OFX payload from raw file content
 *  - convert OFX XML -> JSON string (keeps compatibility with existing converters)
 *  - run converters to obtain typed domain objects (header, signon, bank, transactions)
 *
 * This parser intentionally preserves the previous behavior of the older
 * `src/services/ofx/ofx.ts` implementation but lives inside the feature
 * where OFX processing logically belongs.
 */
class OFXParser {
  raw: string
  jsonData: string
  header: OFXHeader
  signonMessageSet: SignonMessageSet
  bank: Bank
  bankMessage: BankMessage

  constructor(data: string) {
    this.raw = data
    this.jsonData = OFXParser.toJsonString(data)
    this.header = convertStringToOFXHeader(data)
    this.signonMessageSet = StringToOFXSignonMessageSetConverter(this.jsonData)
    this.bank = jsonToBank(this.jsonData)
    this.bankMessage = jsonToBankMessages(this.jsonData)
  }

  /**
   * Convert the OFX XML portion of a raw OFX file to a JSON string.
   * The method tries to find the first occurrence of the <OFX> tag and
   * convert the remainder to JSON using `xml-js`.
   *
   * @param data Raw OFX file content (string)
   * @returns JSON string representing the OFX XML content
   */
  private static toJsonString(data: string): string {
    if (!data || typeof data !== 'string') {
      throw new Error('Invalid OFX content: expected non-empty string')
    }

    const openTagIndex = data.indexOf('<OFX>')
    if (openTagIndex === -1) {
      // Try case-insensitive search as a fallback
      const lower = data.toLowerCase()
      const lowerIndex = lower.indexOf('<ofx>')
      if (lowerIndex === -1) {
        throw new Error('Malformed OFX: missing <OFX> tag')
      }
      // Use the original string's offset
      const splitedData = `<OFX>${data.slice(lowerIndex + 5)}`
      return convert.xml2json(splitedData, { compact: true, spaces: 4 })
    }

    const splitedData = `<OFX>${data.split('<OFX>')[1]}`
    try {
      const json = convert.xml2json(splitedData, { compact: true, spaces: 4 })
      return json
    } catch (err) {
      // Bubble up a clearer error
      throw new Error(`Failed to convert OFX XML to JSON: ${(err as Error).message}`)
    }
  }

  /**
   * Returns a parsed JavaScript object from the underlying JSON string.
   * Use with caution if the JSON string is large.
   */
  getParsedObject(): any {
    try {
      return JSON.parse(this.jsonData)
    } catch (_err) {
      throw new Error('Invalid JSON produced from OFX XML')
    }
  }
}

/**
 * Convenience function: parse raw OFX content and return a lightweight result object.
 * The returned object contains:
 *  - header: parsed OFX header (metadata)
 *  - signonMessageSet: signon information from OFX
 *  - bank: bank or credit card account info
 *  - bankMessage: transactions payload mapped to the application's shape
 *  - jsonData: the underlying JSON string (if you need to run other converters)
 *
 * The function throws on malformed input.
 */
const parseOfx = (raw: string) => {
  const parser = new OFXParser(raw)
  return {
    header: parser.header,
    signonMessageSet: parser.signonMessageSet,
    bank: parser.bank,
    bankMessage: parser.bankMessage,
    jsonData: parser.jsonData,
    parsedObject: parser.getParsedObject(),
  }
}

export { OFXParser, parseOfx }
