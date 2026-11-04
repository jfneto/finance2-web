import type { BankMessage, Transaction } from '../types'
import { formatDateOFX } from './ofx-utils'

const ammountToNumber = (value: string): number => {
  const converted = Number(value)

  return converted > 0 ? converted : converted * -1
}

const isCredit = (value: string): boolean => {
  const number = Number(value)
  return number > 0
}

const jsonToBankMessages = (jsonData: string): BankMessage => {
  const json = JSON.parse(jsonData)

  const isCreditCard = json.OFX.CREDITCARDMSGSRSV1 !== undefined

  let jsonTransactions: any

  if (!isCreditCard) {
    jsonTransactions = json.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN
  } else {
    jsonTransactions = json.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN
  }

  const transations: Transaction[] = jsonTransactions.map((transaction: any) => {
    return {
      type: transaction.TRNTYPE._text,
      dtPosted: formatDateOFX(transaction.DTPOSTED._text, 'yyyy-MM-dd'),
      amount: ammountToNumber(transaction.TRNAMT._text),
      fitId: transaction.FITID._text,
      credit: isCredit(transaction.TRNAMT._text),
      memo: transaction.MEMO._text,
    }
  })

  const result: BankMessage = {
    transactions: isCreditCard ? undefined : transations,
    creditCardTransactions: isCreditCard ? transations : undefined,
  }

  return result
}

export { jsonToBankMessages }
