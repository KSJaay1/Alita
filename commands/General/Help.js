const Discord = require("discord.js");

module.exports = {
    //Command Information
    name: "help",
    description: "Get the list of commands Alita offers.",
    usage: "help\nhelp [command]",
    enabled: true,
    aliases: ["stats"],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {

      if(!args[0]){
        return client.tools.fetchCmdList(client, message, data)
      }else{
        let cmd = await client.commands.get(args[0].toLowerCase())

        if(!cmd){
          return message.channel.send("Unable to find the command: " + args[0])
        }

        let embed = new Discord.MessageEmbed()
        .setTitle(cmd.name)
        .setDescription(`**Description:** ${cmd.description}\n**Usage:** \`\`\`${cmd.usage}\`\`\`\n**Cooldown:** ${cmd.cooldown/1000} seconds`)
        .setColor(data.config.color)
        .setFooter(data.config.footer)
        return message.channel.send(embed)

      }
    },
};