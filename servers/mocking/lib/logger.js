const winston = require("winston");
const { config } = require("dotenv");

config();

let level = process.env.COREMEDIA_MOCKING_LOGLEVEL || "info";
let silent = process.env.NODE_ENV === "test";

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf((info) => `${info.timestamp} [${info.level.toUpperCase()}]  ${info.message}`)
);
const transports = [new winston.transports.Console()];

const logger = winston.createLogger({
  level: level,
  format: format,
  silent: silent,
  transports: transports,
});

// add file logging
const logfile = "./logs/mocking.log";
if (process.env.COREMEDIA_MOCKING_ENABLE_LOGFILE === "true") {
  logger.add(new winston.transports.File({ filename: logfile }));
  logger.info("Enabled file logging to " + logfile);
}

module.exports = {
  logger,
};
