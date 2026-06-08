const NEWSLETTER_JID = '120363426553571462@newsletter';

module.exports = {
    name: 'اوامر',
    desc: 'قائمة الأوامر الرئيسية',
    async execute(sock, m, args, { from }) {
        const text = `*(اسيا 🦅 v1)* \`اشهر بوت في الواتساب\`

*مرحباً! اختار القسم اللي عايزه:*

*📋.جروب* - أوامر الجروبات
*💬.الشات* - أوامر الشات الخاصة
*⬇️.تحميل* - أوامر التحميل
*👑.المطور* - معلومات المطور
*😂.ترفيه* - أوامر الضحك
*🛡️.ادمن* - أوامر الادمن بس
*⚙️.مطور* - أوامر المطور الخاصة

اكتب الأمر + اسم القسم
مثال:.جروب`;

        await sock.sendMessage(from, {
            text,
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: NEWSLETTER_JID,
                    newsletterName: 'اسيا 🦅',
                    serverMessageId: 1
                },
                forwardingScore: 999
            }
        }, { quoted: m });
    }
}
