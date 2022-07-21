import { Interaction, MessageEmbed, CommandInteractionOptionResolver, Message, CommandInteraction, ApplicationCommand } from "discord.js";

import {SlashCommandBuilder, SlashCommandStringOption} from '@discordjs/builders';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('shows a list of commands for the bot'),
    
    async execute(interaction: CommandInteraction) {

        
    try {
        let commandsList: string | undefined
        const client = interaction.client
        const cmd = await client.application?.commands.fetch()
            
        commandsList = cmd?.map((cmd: ApplicationCommand) => `**/${cmd.name}** - ${cmd.description}`).join('\n')

        const embed = new MessageEmbed()
                  .setColor(`#6bde36`)
                  .setTitle(`${client.user?.username}'s commands`)
                  .setDescription(`${commandsList}`)
                  .setThumbnail(client.user?.avatarURL({dynamic:true})!)
        
        await interaction.reply({embeds: [embed]}) 
          
        

            
        } catch(error) {
            await interaction.reply({ content: 'This server has 0 commands', ephemeral: true })
            console.error(error)
        }
    }
}