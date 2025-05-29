/**
 * Logger Utility
 * 
 * A centralized logging utility that can output to both console and file.
 * Uses Winston for flexible logging with different log levels.
 * 
 * @param {Object} options - Configuration options for the logger
 * @param {string} options.level - Minimum log level to output (error, warn, info, debug)
 * @param {string} options.file - Path to log file
 * @param {boolean} options.console - Whether to log to console
 * @returns {Object} Configured logger instance
 */
const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const ensureLogsDir = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

module.exports = (options = {}) => {
  const { level = 'info', file = 'logs/application.log', console: useConsole = true } = options;
  
  // Define log format
  const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  );

  // Create transports array based on options
  const transports = [];
  
  if (useConsole) {
    transports.push(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      level: level
    }));
  }
  
  if (file) {
    ensureLogsDir(file);
    transports.push(new winston.transports.File({
      filename: file,
      format: logFormat,
      level: level,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true
    }));
  }

  // Create and configure the logger
  const logger = winston.createLogger({
    level: level,
    format: logFormat,
    defaultMeta: { service: 'cosmis-bot' },
    transports: transports
  });

  // Add a method to log uncaught exceptions
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    // Don't exit immediately, give time to flush logs
    setTimeout(() => process.exit(1), 1000);
  });

  // Add a method to log unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  return logger;
};
