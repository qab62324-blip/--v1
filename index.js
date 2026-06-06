import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

console.log('🚀 جاري بدء البوت...');

// قراءة متغيرات البيئة
const phoneNumber = process.env.PHONE_NUMBER || '201142182793';
const prefixList = process.env.PREFIX ? process.env.PREFIX.split(',') : [".", "/", "!"];

// دالة لإنشاء كود عشوائي من 8 أحرف وأرقام
function generateSessionCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const client = new Client({
  phoneNumber: phoneNumber,
  prefix: prefixList,
  fromMe: false,
  printQR: false, // تعطيل عرض الباركود
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
    console.log('📱 الرقم: ' + phoneNumber);
    
    // إنشاء كود الجلسة وإرساله للمالك
    const sessionCode = generateSessionCode();
    console.log(`🔐 كود الجلسة: ${sessionCode}`);
    
    // إرسال الكود للمالك
    client.sendMessage('201142182793@s.whatsapp.net', {
      text: `✅ تم تشغيل البوت بنجاح!\n\n🔐 كود الجلسة: ${sessionCode}\n\n🤖 اسم البوت: ${config.info.nameBot}\n📱 الرقم: ${phoneNumber}`
    }).catch(err => console.error('❌ خطأ في إرسال الكود:', err.message));
    
    // تحميل البوتات الثانوية
    try {
      sub(client).catch(err => console.error('❌ خطأ في تحميل البوتات الثانوية:', err.message));
    } catch (error) {
      console.error('❌ خطأ غير متوقع:', error.message);
    }
  }
});

client.ev.on('messages.upsert', async (m) => {
  try {
    if (!m.messages) return;
    
    const msg = m.messages[0];
    
    if (!msg.message) return;
    if (msg.key.fromMe) return;
    
    const sender = msg.key.remoteJid;
    const messageBody = getMessageText(msg);
    
    // معالجة الرسائل
    console.log(`📨 رسالة من: ${sender}`);
    console.log(`💬 المحتوى: ${messageBody}`);
    
  } catch (error) {
    console.error('❌ خطأ في معالجة الرسالة:', error.message);
  }
});

/**
 * استخراج نص الرسالة من أنواع مختلفة
 * @param {Object} msg - كائن الرسالة
 * @returns {string|null} - نص الرسالة أو null
 */
function getMessageText(msg) {
  if (!msg.message) return null;
  
  if (msg.message.conversation) return msg.message.conversation;
  if (msg.message.extendedTextMessage?.text) return msg.message.extendedTextMessage.text;
  if (msg.message.imageMessage?.caption) return msg.message.imageMessage.caption;
  if (msg.message.videoMessage?.caption) return msg.message.videoMessage.caption;
  if (msg.message.audioMessage) return '[🎵 ملف صوتي]';
  if (msg.message.documentMessage) return '[📄 ملف]';
  if (msg.message.stickerMessage) return '[🎨 ملصق]';
  
  return null;
}

// معالجة الأخطاء غير المتوقعة
process.on('unhandledRejection', (err) => {
  console.error('❌ خطأ غير معالج:', err);
});

process.on('uncaughtException', (err) => {
  console.error('❌ استثناء غير متوقع:', err);
});

// بدء البوت
client.start().catch(err => {
  console.error('❌ خطأ في بدء البوت:', err.message);
  process.exit(1);
});

export default client;
