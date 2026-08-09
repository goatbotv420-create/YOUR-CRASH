const settings = require('../settings.js');

function formatTime(seconds) {
    const days = Math.floor(seconds / 86400);
    seconds %= 86400;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days) time += `${days}d `;
    if (hours) time += `${hours}h `;
    if (minutes) time += `${minutes}m `;
    if (seconds || !time) time += `${seconds}s`;

    return time.trim();
}

async function pingCommand(sock, chatId, message) {
    try {
        const start = Date.now();

        const sent = await sock.sendMessage(
            chatId,
            { text: '🏓 *Pong!*' },
            { quoted: message }
        );

        const ping = Date.now() - start;
        const uptime = formatTime(process.uptime());

        const text = `🏓 *Pong!*

⚡ ${ping}ms
⏱️ ${uptime}
📦 ${settings.version}

> GAAJU-XMD`;

        await sock.sendMessage(
            chatId,
            { text },
            { quoted: message }
        );

    } catch (error) {
        console.error('Ping error:', error);
        await sock.sendMessage(
            chatId,
            { text: '❌ Failed to get ping.' },
            { quoted: message }
        );
    }
}

module.exports = pingCommand;
