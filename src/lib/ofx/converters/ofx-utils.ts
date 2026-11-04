const separatePartsOfDate = (date: string) => {
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)
  const hour = date.slice(8, 10)
  const minutes = date.slice(10, 12)
  const seconds = date.slice(12, 14)
  const [offset, timezone] = date.slice(14).replace('[', '').replace(']', '').split(':')
  return {
    yyyy: year,
    yy: year.slice(2),
    y: year,
    MM: month,
    M: month,
    dd: day,
    d: day,
    hh: hour,
    h: hour,
    mm: minutes,
    m: minutes,
    ss: seconds,
    s: seconds,
    O: offset,
    TZ: timezone,
  }
}

const formatDateOFX = (date: string, format: string) => {
  const parts = separatePartsOfDate(date)
  let result = format
  for (const [key, value] of Object.entries(parts)) {
    result = result.replace(key, value)
  }
  return result
}

// export function fixJsonProblems(content: string) {
//   const result = content
//     .replace(/(},})/g, '}}')
//     .replace(/(}")/g, '},"')
//     .replace(/(},])/g, '}]')
//     .replace(/(,})/g, '}')
//     .replace(/({")/g, '{\n"')
//     .replace(/(})/g, '\n}')
//     .replace(/(",")/g, '",\n"')
//     .replace(/,\s*}/g, '\n}')
//   return result.at(-1) === ',' ? result.slice(0, -1) : result
// }

// export function extractFinancialInstitutionTransactionId(fitid: string) {
//   const dateText = fitid.slice(0, 12)
//   const transactionCode = fitid.slice(12, 19)
//   const protocol = fitid.slice(19)
//   const resultObject = {
//     date: dateText,
//     transactionCode,
//     protocol,
//   }
//   return JSON.stringify(resultObject)
// }

// export function isDateField(field: string) {
//   return field.startsWith('DT')
// }

// export function trim(str: string) {
//   return str.trim()
// }

// export function isValidNumberToConvert(field: string, value: string) {
//   if (field.endsWith('ID') || field.endsWith('NUM')) return false
//   return !isNaN(Number(value))
// }

export { formatDateOFX }
