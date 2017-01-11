const http = require('http')
const express = require('express')
const WebSocketServer = require('ws').Server

const httpServer = http.createServer()
const app = express()

app.use(express.static('public'))

app.set('port', (process.env.PORT || 3001))

// only serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

const wss = new WebSocketServer({
  server: httpServer
})

wss.on('connection', (ws) => {
  console.log(`client connected`)

  ws.broadcast = function (data) {
    wss.clients.forEach((client) => {
      if (client !== ws) {
        client.send(data)
      }
    })
  }

  ws.on('message', (data) => {
    console.log(`broadcasting ${data}`)
    ws.broadcast(data)
  })

  ws.on('disconnect', () => {
    console.log(`client disconnected`)
  })
})

// start the server
httpServer.on('request', app)
httpServer.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}`) // eslint-disable-line no-console
})
