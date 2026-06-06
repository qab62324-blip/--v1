import { Command } from 'meowsab';

const menu = new Command({
  name: 'menu',
  description: 'عرض قائمة الأوامر',
  aliases: ['قائمة', 'الأوامر'],
  category: 'main'
});

menu.run = async (message) => {
  const { client, reply } = message;
  const { info } = client.config;

  const menuText = `
╔════════════════════════════════╗
║     🤖 ${info.nameBot}
╠════════════════════════════════╣
║  📋 قائمة الأوامر:
║  🔹 .ping - اختبر البوت
║  🔹 .menu - عرض القائمة
║  🔹 .info - معلومات البوت
║  🔹 .owner - صاحب البوت
╠════════════════════════════════╣
║  المالك: عقاب آل أصلي
║  الإصدار: v2.1.0
╚════════════════════════════════╝
  `;

  await reply(menuText);
};

export default menu;
