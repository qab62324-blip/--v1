import { Command } from 'meowsab';

const info = new Command({
  name: 'info',
  description: 'معلومات البوت',
  aliases: ['معلومات'],
  category: 'main'
});

info.run = async (message) => {
  const { client, reply } = message;
  const { info: botInfo } = client.config;

  const infoText = `
╔════════════════════════════════╗
║     ℹ️ معلومات البوت
╠════════════════════════════════╣
║  🤖 الاسم: ${botInfo.nameBot}
║  👤 المالك: عقاب آل أصلي
║  📱 القناة: ${botInfo.nameChannel}
║  🔗 الرابط:
║  ${botInfo.urls.channel}
║  ✨ الإصدار: v2.1.0
╚════════════════════════════════╝
  `;

  await reply(infoText);
};

export default info;
