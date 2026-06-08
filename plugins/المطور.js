const NEWSLETTER_JID = '120363426553571462@newsletter';

module.exports = {
    name: 'المطور',
    desc: 'معلومات المطور',
    async execute(sock, m, args, { from }) {
        const text = `*👑 معلومات المطور*

*الاسم:* عقاب الاصلي
*الرقم:* 201142182793
*جروبي:* https://chat.whatsapp.com/HFMDkO5G4z175nDviDsZYR
*قناتي:* https://whatsapp.com/channel/0029VbD2pIvFXUuVFTTsek0J

*البوت:* اسيا 🦅 v1
*شغال 24 ساعة* 🔥`;

        await sock.sendMessage(from, {
            text,
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: NEWSLETTER_JID,
                    newsletterName: 'اسيا 🦅',
                    serverMessageId: 2
                }
            }
        }, { quoted: m });
    }
}
