import type { Bank } from '../types'

const jsonToBank = (jsonData: string): Bank => {
  const json = JSON.parse(jsonData)
  let result: Bank
  if (json.OFX.BANKMSGSRSV1 !== undefined) {
    result = {
      id: json.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKACCTFROM.BANKID._text,
      branchId: json.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKACCTFROM.BRANCHID._text,
      acctId: json.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKACCTFROM.ACCTID._text,
      acctType: json.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKACCTFROM.ACCTTYPE._text,
    }
  } else {
    result = {
      creditCardNumber: json.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.CCACCTFROM.ACCTID._text,
    }
  }

  return result
}

export { jsonToBank }
