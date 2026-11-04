import type { SignonMessageSet } from '../types'

const StringToOFXSignonMessageSetConverter = (jsonData: string): SignonMessageSet => {
  const json = JSON.parse(jsonData)

  const result: SignonMessageSet = {
    signon: {
      status: {
        code: json.OFX.SIGNONMSGSRSV1.SONRS.STATUS.CODE._text,
        severity: json.OFX.SIGNONMSGSRSV1.SONRS.STATUS.SEVERITY._text,
      },
      dtServer: json.OFX.SIGNONMSGSRSV1.SONRS.DTSERVER._text,
      language: json.OFX.SIGNONMSGSRSV1.SONRS.LANGUAGE._text,
      financialInstitution: {
        org: json.OFX.SIGNONMSGSRSV1.SONRS.FI.ORG._text,
        fid: json.OFX.SIGNONMSGSRSV1.SONRS.FI.FID._text,
      },
    },
  }

  return result
}

export { StringToOFXSignonMessageSetConverter }
