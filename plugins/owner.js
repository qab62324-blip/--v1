import { Command } from 'meowsab';

const owner = new Command({
  name: 'owner',
  description: 'معلومات صاحب البوت',
  aliases: ['مالك', 'صاحب'],
  category: 'main'
});

owner.run = async (message) => {
  const { reply } = message;

  const ownerText = `
╔════════════════════════════════╗
║     👑 صاحب البوت
╠════════════════════════════════╣
║  📛 الاسم: عقاب آل أصلي
║  📱 الرقم: 201142182793
║  🆔 المعرف: 52429437595728
║  💬 تواصل: wa.me/201142182793
╚════════════════════════════════╝
  `;

  await reply(ownerText);
};

export default owner;
