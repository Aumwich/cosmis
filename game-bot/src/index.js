/**
 * Game Bot - Main Entry Point
 * 
 * This is the main file for the Game Bot which handles the core game mechanics,
 * economy, and in-game interactions for the SIMSOC-based social simulation.
 */

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config');
const logger = require('../../shared/utils/logger')(config.logging);

// Import database utilities
const { initializeDatabase } = require('../../shared/database');

// Create a new Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

// Store commands in a collection
client.commands = new Collection();

/**
 * Event: When the client is ready
 */
client.once('ready', async () => {
  logger.info(`Game Bot logged in as ${client.user.tag}`);
  
  try {
    // Initialize database connection
    await initializeDatabase(config.database);
    logger.info('Game Bot database connection established');
    
    // Set bot presence
    client.user.setPresence({
      status: config.presence.status,
      activities: config.presence.activities,
    });
    
    // Initialize game systems
    await initializeGameSystems();
    
    logger.info('Game Bot is ready!');
  } catch (error) {
    logger.error('Error during Game Bot initialization:', error);
    process.exit(1);
  }
});

/**
 * Initialize game systems and timers
 */
async function initializeGameSystems() {
  try {
    // TODO: Load game state from database
    // TODO: Initialize turn timers
    // TODO: Load player data
    
    logger.info('Game systems initialized');
  } catch (error) {
    logger.error('Error initializing game systems:', error);
    throw error;
  }
}

/**
 * Event: When a new guild (server) is added
 */
client.on('guildCreate', (guild) => {
  logger.info(`Game Bot added to new guild: ${guild.name} (${guild.id})`);
  // TODO: Set up game channels and roles
});

/**
 * Event: When an interaction is created (for slash commands)
 */
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error(`Error executing command ${interaction.commandName}:`, error);
    
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error executing this command!',
        ephemeral: true,
      });
    }
  }
});

// Handle errors
client.on('error', (error) => {
  logger.error('Game Bot client error:', error);
});

process.on('unhandledRejection', (error) => {
  logger.error('Game Bot unhandled promise rejection:', error);
});

// Handle process termination
process.on('SIGINT', async () => {
  logger.info('Shutting down Game Bot...');
  try {
    // TODO: Save game state
    await client.destroy();
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Login to Discord with the bot token
client.login(config.token)
  .catch((error) => {
    logger.error('Failed to log in Game Bot:', error);
    process.exit(1);
  });
