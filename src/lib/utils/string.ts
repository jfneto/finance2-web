const StringOrUndefined = (value: any): string | undefined => {
  if (!value) {
    return undefined
  }

  switch (typeof value) {
    case 'string':
      return value
    case 'undefined':
      return undefined
    case 'number':
      return value.toString()
    case 'bigint':
      return value.toString()
    case 'boolean':
      return value.toString()
  }
}

const StringOrEmpty = (value: any): string => {
  if (!value) {
    return ''
  }

  switch (typeof value) {
    case 'string':
      return value.toString()
    case 'undefined':
      return ''
    case 'number':
      return value.toString()
    case 'bigint':
      return value.toString()
    case 'boolean':
      return value.toString()
  }

  return ''
}

const StringOrDefault = (value: string | undefined, def: string = ''): string => {
  if (!value) {
    return def
  }

  return value
}

export { StringOrDefault, StringOrEmpty, StringOrUndefined }
