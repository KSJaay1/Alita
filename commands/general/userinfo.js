const {successEmbed} = require("../../utils/embeds");

module.exports = {
  name: "userinfo",
  category: "📋 General",
  permissions: {
    admin: true,
  },
  database: {
    guild: true,
    user: true,
    member: true,
  },
  interaction: {},

  async execute(client, interaction, data = {}) {
    try {
      const member =
        interaction.options.getMember("user") || interaction.member;

      const userTag = member.user.tag;
      const userNickname = member.nickname;
      const userAvatar = member.user.avatarURL({dynamic: true});
      const userCreatedAt = member.user.createdAt;
      const userJoinedAt = member.joinedAt;
      const userRoles = member.roles.cache
        .filter((role) => role.name !== "@everyone")
        .sort((a, b) => b.position - a.position)
        .map((role) => `${role}`);

      return interaction.reply({
        embeds: [
          successEmbed({
            author: {
              name: member.user.username,
              icon_url: member.user.displayAvatarURL({dynamic: true}),
              url: "",
            },
            thumbnail: {
              url: member.user.displayAvatarURL({dynamic: true}),
            },

            fields: [
              {
                name: "General",
                value: `**Nickname:** ${userNickname}\n**Avatar:** [Click Here](${userAvatar})\n**Created At:** ${userCreatedAt}\n**Joined At:** ${userJoinedAt}\n**Roles:** ${userRoles.join(
                  "\n"
                )}`,
              },
            ],
          }),
        ],
      });
    } catch (error) {
      logger.error(`Error executing '${this.name}' command!`, {
        label: "Command",
        message: error.message,
        stack: error.stack,
        data,
      });
    }
  },
};