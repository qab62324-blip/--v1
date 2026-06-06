import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

console.log('🚀 جاري بدء البوت...');

const client = new Client({
  phoneNumber: '201142182793',
  prefix: [".", "/", "!"],
  fromMe: false,
  printQR: true,
  owners: [
    {
      name: "عقاب آل أصلي",
      jid: "201142182793@s.whatsapp.net"
    },
    {
      name: "المطور",
      jid: "52429437595728@s.whatsapp.net"
    }
  ],
  commandsPath: './plugins'
});

if (!global.db) {
  global.db = new UltraDB();
}

const { config } = client;
config.info = {
  nameBot: "♡ ASIA v1 🎪",
  nameChannel: "قناة آسيا v1",
  idChannel: "120363426553571462@newsletter",
  urls: {
    repo: "https://github.com/qab62324-blip/--v1",
    channel: "https://whatsapp.com/channel/0029VbD2pIvFXUuVFTTsek0J"
  },
  copyright: {
    pack: 'آسيا v1',
    author: 'عقاب آل أصلي'
  },
  images: [
    "https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg"
  ]
};

client.ev.on('connection.update', (update) => {
  const { connection, lastDisconnect } = update;
  if (connection === 'close') {
    if (lastDisconnect?.error?.output?.statusCode !== 401) {
      console.log('⏳ جاري إعادة الاتصال...');
      setTimeout(() => client.start(), 3000);
    } else {
      console.log('❌ انتهت الجلسة - قم بمسح session وحاول مجدداً');
    }
  } else if (connection === 'connecting') {
    console.log('🔄 جاري الاتصال...');
  } else if (connection === 'open') {
    console.log('✅ البوت متصل بنجاح!');
    console.log('🤖 اسم البوت: ' + config.info.nameBot);
    console.log('👤 المالك: عقاب آل أصلي');
    console.log('📱 الرقم: 201142182793');
  }
});

client.ev.on('messages.upsert', async (m) => {
  if (!m.messages) return;
  
  const msg = m.messages[0];
  
  if (!msg.message) return;
  if (msg.key.fromMe) return;
  
  const sender = msg.key.remoteJ

