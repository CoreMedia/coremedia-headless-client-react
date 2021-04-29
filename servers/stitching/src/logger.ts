import winston from "winston";
import { config } from "dotenv";

config();

const level = process.env.COREMEDIA_STITCHING_LOGLEVEL || "info";
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf((info) => `${info.timestamp} [${info.level.toUpperCase()}]  ${info.message}`)
);
const transports = [new winston.transports.Console()];

const logger = winston.createLogger({
  level: level,
  format: format,
  transports: transports,
});

// add file logging
export const logfile = "./logs/stitching.log";
if (process.env.COREMEDIA_STITCHING_ENABLE_LOGFILE === "true") {
  logger.add(new winston.transports.File({ filename: logfile }));
  logger.info("Enabled file logging to " + logfile);
}

export default logger;
