/**
 * Deploy Commands
 * 
 * This script registers slash commands with Discord.
 * Run this script whenever you add, remove, or update commands.
 */

const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config');

// Create an array to hold command data
const commands = [];
const commandsPath = path.join(__dirname, 'commands');

// Read all command files
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Load each command's data
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
    console.log(`Loaded command: ${command.data.name}`);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing required "data" or "execute" property.`);
  }
}

// Create REST instance
const rest = new REST().setToken(config.token);

// Deploy commands
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands
    const data = await rest.put(
      Routes.applicationCommands(config.clientId),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
