export function getMessageText(msg) {
  if (!msg.message) return null;
  if (msg.message.conversation) return msg.message.conversation;
  if (msg.message.extendedTextMessage?.text) return msg.message.extendedTextMessage.text;
  if (msg.message.imageMessage?.caption) return msg.message.imageMessage.caption;
  if (msg.message.videoMessage?.caption) return msg.message.videoMessage.caption;
  return msg.body || null;
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomImage(images) {
  return images[Math.floor(Math.random() * images.length)];
}

export function formatTime(date) {
  const d = new Date(date);
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}
