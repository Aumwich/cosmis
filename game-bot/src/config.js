/**
 * Configuration settings for the Game Bot
 * This file contains environment variables and default settings specific to the game bot
 */

require('dotenv').config();

module.exports = {
  // Discord bot token (from Discord Developer Portal)
  token: process.env.DISCORD_TOKEN_GAME || process.env.DISCORD_TOKEN,
  
  // Bot client ID (from Discord Developer Portal)
  clientId: process.env.CLIENT_ID_GAME || process.env.CLIENT_ID,
  
  // Game-specific configuration
  game: {
    // Turn duration in milliseconds (30 minutes)
    turnDuration: 30 * 60 * 1000,
    
    // Time between turns in milliseconds (5 minutes)
    turnInterval: 5 * 60 * 1000,
    
    // Starting resources for new players
    startingResources: {
      money: 1000,
      influence: 10,
      goods: 0
    },
    
    // Game regions
    regions: ['North', 'South', 'East', 'West'],
    
    // Default game settings
    defaultSettings: {
      maxPlayers: 50,
      minPlayers: 5,
      privateGame: false,
      password: ''
    }
  },
  
  // Bot status
  presence: {
    status: 'online',
    activities: [{
      name: 'the social simulation',
      type: 'PLAYING'
    }]
  },
  
  // Logging configuration
  logging: {
    level: 'debug', // error, warn, info, debug
    file: 'logs/game-bot.log',
    console: true
  },
  
  // Database configuration (shared with admin bot)
  database: {
    client: 'sqlite3',
    connection: {
      filename: './shared/database/cosmis.db'
    },
    useNullAsDefault: true
  }
};
