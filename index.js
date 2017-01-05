const createStream = require('broadcast-stream')

const stream = createStream(8999)

const stdin = process.stdin
const stdout = process.stdout

stream.on('data', function (msg) {
  const key = msg.toString('utf8')
  switch (key) {
    case '\u000A':
    case '\u000D':
      // new line
      console.log('')
      break
    default:
      stdout.write(key)
  }
})

stdin.setRawMode(true)
stdin.resume()

stdin.setEncoding('utf8')

// on any data into stdin
stdin.on('data', function (key) {
  switch (key) {
    case '\u0003':
      // ctrl-c ( end of text )
      process.exit()
      break
    default:
      // stream.write(new Buffer(key, 'utf8'))
      stream.write(key)
  }
})
