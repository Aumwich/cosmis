/**
 * Ping Command
 * 
 * A simple command to test if the bot is responsive.
 * Returns the bot's latency (ping) to the Discord API.
 */

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  // Command definition using SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with the bot latency'),
  
  /**
   * Execute function that runs when the command is called
   * @param {Interaction} interaction - The interaction object from Discord.js
   */
  async execute(interaction) {
    // Defer the reply to show the user that the bot is processing the command
    await interaction.deferReply();
    
    // Calculate the bot's latency
    const sent = await interaction.followUp({ content: 'Pinging...', fetchReply: true });
    const pingLatency = sent.createdTimestamp - interaction.createdTimestamp;
    
    // Edit the reply with the calculated latency
    await interaction.editReply(`Pong! Bot latency: ${pingLatency}ms. API Latency: ${Math.round(interaction.client.ws.ping)}ms`);
  },
};
