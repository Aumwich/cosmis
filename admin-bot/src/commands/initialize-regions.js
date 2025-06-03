/**
 * Initialize Regions Command
 * 
 * Creates the five basic regions for the Cosmis simulation, each with text and voice channels.
 * Regions are named by their colors according to SIMSOC rules.
 * This command can only be used by administrators.
 */

const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

// Define the regions based on SIMSOC rules with the correct color names
const REGIONS = [
  {
    name: 'Red Region',
    description: 'The Red region of the simulation',
    color: 'RED',
    textChannelName: 'red-region',
    voiceChannelName: 'red-voice'
  },
  {
    name: 'Yellow Region',
    description: 'The Yellow region of the simulation',
    color: 'YELLOW',
    textChannelName: 'yellow-region',
    voiceChannelName: 'yellow-voice'
  },
  {
    name: 'Blue Region',
    description: 'The Blue region of the simulation',
    color: 'BLUE',
    textChannelName: 'blue-region',
    voiceChannelName: 'blue-voice'
  },
  {
    name: 'Green Region',
    description: 'The Green region of the simulation',
    color: 'GREEN',
    textChannelName: 'green-region',
    voiceChannelName: 'green-voice'
  },
  {
    name: 'Gray Region',
    description: 'The Gray region of the simulation',
    color: 'GRAY',
    textChannelName: 'gray-region',
    voiceChannelName: 'gray-voice'
  }
];

module.exports = {
  // Command definition using SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName('initialize-regions')
    .setDescription('Creates the five basic regions for the Cosmis simulation')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Only administrators can use this command
  
  /**
   * Execute function that runs when the command is called
   * @param {Interaction} interaction - The interaction object from Discord.js
   */
  async execute(interaction) {
    // Defer the reply since this might take some time
    await interaction.deferReply({ ephemeral: true });
    
    try {
      // Check for and delete any existing REGIONS category
      const existingCategories = interaction.guild.channels.cache.filter(
        channel => channel.type === ChannelType.GuildCategory && channel.name === 'REGIONS'
      );
      
      if (existingCategories.size > 0) {
        await interaction.editReply({ content: 'Found existing REGIONS category. Deleting it first...', ephemeral: true });
        
        // Delete all channels in each existing category
        for (const [_, category] of existingCategories) {
          const childChannels = interaction.guild.channels.cache.filter(channel => channel.parentId === category.id);
          
          for (const [__, channel] of childChannels) {
            await channel.delete('Cleaning up before creating new regions');
          }
          
          // Delete the category itself
          await category.delete('Cleaning up before creating new regions');
        }
      }
      
      // Create a new category for all regions
      const regionsCategory = await interaction.guild.channels.create({
        name: 'REGIONS',
        type: ChannelType.GuildCategory,
        reason: 'Setting up Cosmis simulation regions'
      });
      
      // Create each region with text and voice channels under the category
      const createdChannels = [];
      
      for (const region of REGIONS) {
        // Create text channel for the region
        const textChannel = await interaction.guild.channels.create({
          name: region.textChannelName,
          type: ChannelType.GuildText,
          parent: regionsCategory.id,
          topic: region.description,
          reason: `Creating ${region.name} text channel for Cosmis simulation`
        });
        
        // Create voice channel for the region
        const voiceChannel = await interaction.guild.channels.create({
          name: region.voiceChannelName,
          type: ChannelType.GuildVoice,
          parent: regionsCategory.id,
          reason: `Creating ${region.name} voice channel for Cosmis simulation`
        });
        
        createdChannels.push(`${region.name}: ${textChannel.toString()} and ${voiceChannel.toString()}`);
      }
      
      // Respond with success message
      await interaction.editReply({
        content: `Successfully created the following region channels:\n${createdChannels.join('\n')}`,
        ephemeral: true
      });
      
    } catch (error) {
      console.error('Error creating regions:', error);
      await interaction.editReply({
        content: `Failed to create regions: ${error.message}`,
        ephemeral: true
      });
    }
  },
};
