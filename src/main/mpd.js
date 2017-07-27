function parseMpdResponse (toParse) {
  let lines = toParse.split('\n')
  let response = {}

  lines.forEach((line) => {
    if (line.trim() !== '') {
      let key = line.substr(0, line.indexOf(':'))
      let value = line.substr(line.indexOf(':') + 1).trim()
      response[key] = value
    }
  })

  return response
}

export default {
  parseMpdResponse
}
