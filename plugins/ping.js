import { Command } from 'meowsab';

const ping = new Command({
  name: 'ping',
  description: 'اختبر البوت',
  aliases: ['بنج', 'اختبر'],
  category: 'main'
});

ping.run = async (message) => {
  const { reply } = message;
  const start = Date.now();
  await reply('🏓 Pong!');
  const latency = Date.now() - start;
  await reply(`⚡ السرعة: ${latency}ms`);
};

export default ping;
