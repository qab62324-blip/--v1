import { SubBots } from "meowsab";

/**
 * إعداد وتشغيل البوتات الثانوية
 * @param {Object} client - كائن العميل الرئيسي
 * @returns {Promise<SubBots>} - كائن البوتات الثانوية
 */
async function sub(client) {
  try {
    global.subBots = new SubBots(client.commandSystem);
    
    // استخدام متغير البيئة أو رمز افتراضي آمن
    const pariCode = process.env.PARI_CODE || "SECURE1234";
    SubBots.pariCode(pariCode);
    
    const { config } = client;

    await global.subBots.setConfig({
      commandsPath: config.commandsPath || './plugins',
      owners: config.owners,
      prefix: config.prefix,
      info: config.info,
      printQR: false
    });

    global.subBots.on('error', (uid, error) => {
      console.error(`❌ [SubBot ${uid}] خطأ:`, error?.message || error);
    });

    const loadedCount = await global.subBots.load();
    console.log(`✅ تم تحميل ${loadedCount} بوت فرعي`);

    global.subBots.on('ready', async (uid, sock) => {
      console.log(`✅ [SubBot ${uid}] متصل بنجاح!`);
    });

    global.subBots.on('pair', (uid, code) => {
      console.log(`🔐 [SubBot ${uid}] رمز الإقران: ${code}`);
    });

    global.subBots.on('message', async (uid, msg) => {
      try {
        // تجاهل الرسائل المشفرة
        if (msg.key.id.includes("3EB0")) return;
        
        const body = getMessageText(msg);
        const bot = global.subBots.get(uid);
        const sock = bot?.sock;
        
        if (!sock || !body) return;
        
        // رد اختبار البوت
        if (body === "تست" || body === "test") {
          await sock.sendMessage(msg.key.remoteJid, {
            react: { text: "✅", key: msg.key }
          });
          console.log(`✅ [SubBot ${uid}] رد على اختبار من ${msg.key.remoteJid}`);
        }
      } catch (error) {
        console.error(`❌ [SubBot ${uid}] خطأ في معالجة الرسالة:`, error?.message);
      }
    });

    global.subBots.on('close', (uid) => {
      console.log(`🔌 [SubBot ${uid}] قطع الاتصال`);
    });

    global.subBots.on('badSession', (uid) => {
      console.log(`⚠️ [SubBot ${uid}] جلسة سيئة - يحتاج إلى إعادة ربط`);
    });

    return global.subBots;
  } catch (error) {
    console.error('❌ خطأ في إعداد البوتات الثانوية:', error.message);
    throw error;
  }
}

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
  
  return msg.body || null;
}

export default sub;
