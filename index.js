import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

const client = new Client({
  phoneNumber: '201142182793',
  prefix: [".", "/", "!"],
  fromMe: false,
  owners: [
    {
      name: "عقاب آل أصلي",
      lid: "52429437595728@lid",
      jid: "201142182793@s.whatsapp.net"
    },
    {
      name: "المطور",
      jid: "52429437595728@s.whatsapp.net",
      lid: "52429437595728@lid"
    }
  ],
  settings: { noWelcome: false },
  commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

if (!global.db) {
    global.db = new UltraDB();
}

const { config } = client;
config.info = {
  nameBot: "♡ 𝙰𝚂𝙸𝙰 𝚟1 🎪 〈",
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
    "https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg",
    "https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png"
  ]
};

client.start();

setTimeout(async () => {
  if (client.commandSystem) {
    sub(client)
  }
}, 2000);

process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('❌ خطأ:', err)
});

console.log('🚀 بوت آسيا v1 يعمل الآن!');
