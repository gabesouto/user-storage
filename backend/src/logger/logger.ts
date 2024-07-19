import { createLogger, format, transports } from 'winston'

// Configure winston logger
const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    // Add other transports like File if needed
  ],
})

export default logger
