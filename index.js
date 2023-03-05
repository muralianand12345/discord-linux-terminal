const fs = require('fs');
require("dotenv").config();

const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.GuildMessages],
    partials: [Partials.Message]
});

client.commands = new Collection();
const Token = process.env.TOKEN;

const config = require('./config.json');
const Discord = require('discord.js');
client.discord = Discord;
client.config = config;

//Event File Read
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
};

client.login(Token); 