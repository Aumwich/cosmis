/**
 * Configuration settings for the Admin Bot
 * This file contains environment variables and default settings
 */

require('dotenv').config();

module.exports = {
  // Discord bot token (from Discord Developer Portal)
  token: process.env.DISCORD_TOKEN,
  
  // Bot client ID (from Discord Developer Portal)
  clientId: process.env.CLIENT_ID,
  
  // Bot's default prefix (though we're using slash commands, this might be useful for some operations)
  prefix: '!',
  
  // Default permissions required for admin commands
  defaultPermissions: ['ADMINISTRATOR'],
  
  // Bot status
  presence: {
    status: 'online',
    activities: [{
      name: 'the server',
      type: 'WATCHING'
    }]
  },
  
  // Logging configuration
  logging: {
    level: 'debug', // error, warn, info, debug
    file: 'logs/admin-bot.log',
    console: true
  },
  
  // Database configuration
  database: {
    client: 'sqlite3',
    connection: {
      filename: './shared/database/cosmis.db'
    },
    useNullAsDefault: true
  }
};
