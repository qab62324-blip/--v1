const NEWSLETTER_JID = '120363426553571462@newsletter';

module.exports = {
    name: 'جروب',
    desc: 'أوامر الجروبات',
    async execute(sock, m, args, { from }) {
        const text = `*📋 أوامر الجروبات*

*للادمن:*
.طرد @منشن - طرد عضو
.ترقية @منشن - يخليه ادمن
.تنزيل @منشن - يشيل الادمنية
.قفل - يقفل الجروب
.فتح - يفتح الجروب
.الرابط - يجيب رابط الجروب
.حذف - يمسح رسالة بالرد

*للكل:*
.مين_الادمن - يظهر الادمنية
.معلومات_الجروب - معلومات الجروب
.ايدي - يجيب ايدي الجروب`;

        await sock.sendMessage(from, {
            text,
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: NEWSLETTER_JID,
                    newsletterName: 'اسيا 🦅',
                    serverMessageId: 3
                }
            }
        }, { quoted: m });
    }
}
