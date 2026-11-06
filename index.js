
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Afficher le QR code pour connecter WhatsApp
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scanne le QR code avec WhatsApp');
});

// Bot connecté
client.on('ready', () => {
    console.log('BOT WHATSAPP CONNECTÉ !');
});

// Accueil des nouveaux membres
client.on('group_join', async (notification) => {
    const chat = await notification.getChat();

    const message =
        'Bienvenue dans notre groupe ! 🎉\n' +
        'Lis les règles et respecte les autres membres.';

    await chat.sendMessage(message);
});

// Réponses automatiques
client.on('message', async (message) => {
    const text = message.body.toLowerCase().trim();

    if (message.fromMe) return;

    if (text === 'bonjour' || text === 'salut') {
        await message.reply('Bonjour 👋 Bienvenue !');
    }

    if (text === 'merci') {
        await message.reply('Avec plaisir 😊');
    }

    if (text === 'aide') {
        await message.reply(
            'Commandes disponibles :\n' +
            '!regles : afficher les règles\n' +
            'bonjour : saluer le bot'
        );
    }

    if (text === '!regles') {
        await message.reply(
            '📜 RÈGLES DU GROUPE\n\n' +
            '1. Respecter tous les membres.\n' +
            '2. Pas d’insultes.\n' +
            '3. Pas de spam.\n' +
            '4. Pas de liens sans autorisation.'
        );
    }
});

// Démarrer le bot
client.initialize();
