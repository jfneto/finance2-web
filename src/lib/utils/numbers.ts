const options: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
}

const currencyFormat = (value: number): string => {
  return Intl.NumberFormat('pt-BR', options).format(value)
}

const formatToCurrency = (value: string): string => {
  if (value === '' || value === undefined || value === null || value === '0') {
    return ''
  }
  return `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
}

export { currencyFormat, formatToCurrency }
