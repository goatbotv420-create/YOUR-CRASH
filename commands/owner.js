const settings = require('../settings');

async function ownerCommand(sock, chatId, message) {
    try {
        const OWNER = {
            name: "Chris Gaaju",
            number: "2348069675806",
            youtube: "youtube.com/@Xchristech",
            github: "github.com/Xchristech2"
        };

        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${OWNER.name}
ORG:GAAJU-XMD;
TITLE:Bot Developer
TEL;waid=${OWNER.number}:+${OWNER.number}
NOTE:© 2026 Chris Gaaju
END:VCARD`;

        await sock.sendMessage(chatId, {
            contacts: {
                displayName: OWNER.name,
                contacts: [{ vcard }]
            }
        });

        const text = `╭─〔 👑 *OWNER* 〕─╮
│
│ 👤 *Name:* ${OWNER.name}
│ 📱 *WhatsApp:* +${OWNER.number}
│ 🤖 *Bot:* ${settings.botName}
│
│ ▶️ ${OWNER.youtube}
│ 💻 ${OWNER.github}
│
╰─ *GAAJU-XMD • 2026* ─╯`;

        await sock.sendMessage(chatId, {
            text,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363406588763460@newsletter',
                    newsletterName: 'Gᴀᴀᴊᴜ-Xᴍᴅ',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });

    } catch (error) {
        console.error('Owner command error:', error);

        await sock.sendMessage(chatId, {
            text: `👑 *${"Chris Gaaju"}*

📱 +2348069675806
🤖 ${settings.botName || 'GAAJU-XMD'}

> Original Bot Developer`
        }, { quoted: message });
    }
}

module.exports = ownerCommand;
