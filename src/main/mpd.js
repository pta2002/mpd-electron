function parseMpdResponse (toParse) {
  let lines = toParse.split('\n')
  let response = {}

  lines.forEach((line) => {
    if (line.trim() !== '') {
      let key = line.substr(0, line.indexOf(':'))
      let value = line.substr(line.indexOf(':') + 1).trim()

      if (Array.isArray(response[key])) {
        response[key].push(value)
      } else if (typeof response[key] === 'string') {
        let t = response[key]
        response[key] = [t, value]
      } else {
        response[key] = value
      }
    }
  })

  return response
}

export default {
  parseMpdResponse
}
