import { SubBots } from "meowsab";

async function sub(client) {
  global.subBots = new SubBots(client.commandSystem)
  SubBots.pariCode("ABCD1234")
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
  console.log(`✅ تم تحميل ${loadedCount} بوت`);

  global.subBots.on('ready', async (uid, sock) => {
    console.log(`✅ [SubBot ${uid}] متصل!`);
  });

  global.subBots.on('pair', (uid, code) => {
    console.log(`🔐 [SubBot ${uid}] رمز الإقران: ${code}`);
  });

  global.subBots.on('message', async (uid, msg) => {
    if (msg.key.id.includes("3EB0")) return;
    const body = getMessageText(msg);
    const bot = global.subBots.get(uid);
    const sock = bot?.sock;
    if (!sock || !body) return;
    try {
      if (body === "تست") {
        await sock.sendMessage(msg.key.remoteJid, {
          react: { text: "✅", key: msg.key }
        });
      }
    } catch (error) {
      console.error(`❌ خطأ:`, error?.message);
    }
  });

  global.subBots.on('close', (uid) => {
    console.log(`🔌 قطع الاتصال`);
  });

  global.subBots.on('badSession', (uid) => {
    console.log(`⚠️ جلسة سيئة`);
  });

  return global.subBots;
}

function getMessageText(msg) {
  if (!msg.message) return null;
  if (msg.message.conversation) return msg.message.conversation;
  if (msg.message.extendedTextMessage?.text) return msg.message.extendedTextMessage.text;
  if (msg.message.imageMessage?.caption) return msg.message.imageMessage.caption;
  if (msg.message.videoMessage?.caption) return msg.message.videoMessage.caption;
  return msg.body || null;
}

export default sub;
