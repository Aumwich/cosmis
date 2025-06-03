/**
 * Simple Admin Bot - For Testing Slash Commands
 * 
 * A simplified version of the admin bot that doesn't require database connections.
 * This is just for testing basic slash commands.
 */

const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

// Create a new Discord client with minimal intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Only need Guilds intent for slash commands
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
    console.log(`Loaded command: ${command.data.name}`);
  } else {
    console.warn(`The command at ${filePath} is missing required "data" or "execute" property.`);
  }
}

/**
 * Event: When the client is ready
 */
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
  console.log('Simple Admin Bot is ready!');
});

/**
 * Event: When an interaction is created (for slash commands)
 */
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);
    
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
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Login to Discord with the bot token
client.login(process.env.DISCORD_TOKEN)
  .catch((error) => {
    console.error('Failed to log in:', error);
    process.exit(1);
  });
