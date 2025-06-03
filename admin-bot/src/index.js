/**
 * Admin Bot - Main Entry Point
 * 
 * This is the main file for the Admin Bot which handles server management,
 * player signup, and out-of-character interactions.
 */

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
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
  ],
});

// Store commands in a collection
client.commands = new Collection();

// Load command files
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Register each command in the collection
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    logger.info(`Loaded command: ${command.data.name}`);
  } else {
    logger.warn(`The command at ${filePath} is missing required "data" or "execute" property.`);
  }
}

/**
 * Event: When the client is ready
 */
client.once('ready', async () => {
  logger.info(`Logged in as ${client.user.tag}`);
  
  try {
    // Initialize database connection
    await initializeDatabase(config.database);
    logger.info('Database connection established');
    
    // Set bot presence
    client.user.setPresence({
      status: config.presence.status,
      activities: [{
        name: config.presence.activities[0].name,
        type: config.presence.activities[0].type
      }],
    });
    
    logger.info('Admin Bot is ready!');
  } catch (error) {
    logger.error('Error during initialization:', error);
    process.exit(1);
  }
});

/**
 * Event: When a new guild (server) is added
 */
client.on('guildCreate', (guild) => {
  logger.info(`Joined new guild: ${guild.name} (${guild.id})`);
  // TODO: Set up default channels and roles
});

/**
 * Event: When an interaction is created (for slash commands)
 */
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

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
  logger.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled promise rejection:', error);
});

// Login to Discord with the bot token
client.login(config.token)
  .catch((error) => {
    logger.error('Failed to log in:', error);
    process.exit(1);
  });
