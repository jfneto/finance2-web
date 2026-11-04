import type { OFXHeader } from '../types'

const SanitizedKey = (key: string): string => {
  const options: any = {
    OFXHEADER: 'ofxHeader',
    DATA: 'data',
    VERSION: 'version',
    SECURITY: 'security',
    ENCODING: 'encoding',
    CHARSET: 'charset',
    COMPRESSION: 'compression',
    OLDFILEUID: 'oldFileUid',
    NEWFILEUID: 'newFileUid',
  }

  return options[key]
}

const convertStringToOFXHeader = (data: string): OFXHeader => {
  const [splitedData] = data.split('<OFX>')
  let fixedData = null

  // if separator is \n
  if (splitedData.split('\n').length > 1) {
    fixedData = splitedData.split('\n')
  } else {
    fixedData = splitedData.split('\r')
  }

  const validate = (line: string) => line.trim().length > 0
  const validatedMetaDataList = fixedData.filter(validate)

  const result: OFXHeader = {}

  for (const line of validatedMetaDataList) {
    const [key, value] = line.split(':')
    const sanitizedKey = SanitizedKey(key.replace('\n', ''))
    result[sanitizedKey as keyof OFXHeader] = value
  }
  return result
}

export { convertStringToOFXHeader }
