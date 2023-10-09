const { createLogger, format, transports } = require('winston')
const morgan = require('morgan')

export const Logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((msg: Record<string, any>) => {
      return `${msg.timestamp} [${msg.level}] ${msg.message}`
    })
  ),
  transports: [new transports.Console({ level: 'http' })],
})

export const HttpLogger = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream: {
    write: (message: string) => Logger.http(message.trim()),
  },
})
