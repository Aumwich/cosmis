/**
 * Database Module
 * 
 * This module provides a centralized database connection and utility functions
 * for both the admin and game bots. It uses Knex.js as a query builder which
 * allows us to be database-agnostic (SQLite for development, PostgreSQL for production).
 */

const knex = require('knex');
const path = require('path');
const logger = require('../utils/logger')({ level: 'debug' });

let dbConnection = null;

/**
 * Initializes the database connection and runs migrations
 * @param {Object} config - Database configuration object
 * @returns {Promise<Object>} Knex database instance
 */
async function initializeDatabase(config) {
  try {
    if (dbConnection) {
      logger.warn('Database already initialized');
      return dbConnection;
    }

    logger.info(`Initializing database connection to ${config.client}...`);
    
    // For SQLite, ensure the directory exists
    if (config.client === 'sqlite3' && config.connection && config.connection.filename) {
      const { ensureDir } = require('fs-extra');
      const dbDir = path.dirname(config.connection.filename);
      await ensureDir(dbDir);
    }

    // Initialize Knex with the provided config
    dbConnection = knex(config);
    
    // Test the connection
    await dbConnection.raw('SELECT 1');
    logger.info('Database connection established successfully');
    
    // Run migrations if this is the first time
    await runMigrations();
    
    return dbConnection;
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    throw error;
  }
}

/**
 * Runs database migrations to create or update tables
 */
async function runMigrations() {
  try {
    logger.info('Running database migrations...');
    // This is a placeholder for actual migrations
    // In a real app, you would use knex.migrate.latest()
    // For now, we'll just log that migrations would run here
    logger.info('Migrations would run here');
  } catch (error) {
    logger.error('Error running migrations:', error);
    throw error;
  }
}

/**
 * Gets the database connection instance
 * @returns {Object} Knex database instance
 * @throws {Error} If the database is not initialized
 */
function getDb() {
  if (!dbConnection) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return dbConnection;
}

/**
 * Closes the database connection
 */
async function closeConnection() {
  if (dbConnection) {
    try {
      await dbConnection.destroy();
      dbConnection = null;
      logger.info('Database connection closed');
    } catch (error) {
      logger.error('Error closing database connection:', error);
      throw error;
    }
  }
}

module.exports = {
  initializeDatabase,
  getDb,
  closeConnection,
  runMigrations
};
