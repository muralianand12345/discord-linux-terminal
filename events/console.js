const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');
var exec = require("child_process").exec;
const { codeBlock } = require("@discordjs/builders");

module.exports = {
    name: 'messageCreate',
    execute: async (message) => {

        if (message.author.bot) return;

        const owner_ID = config.INFO.OWNER_ID;
        const coowner_ID = config.INFO.COOWNER_ID || null
        const consoleID = config.INFO.CONSOLE.CHAN_ID;

        if (message.channel.id === consoleID) {
            const consoleComm = message.content;

            if (message.author.id == owner_ID || message.author.id == coowner_ID) {
                var child = exec(`cd && ${consoleComm}`); //"cd" will make the commands run in user directory

                child.stdout.on('data', async function (data) {
                    await message.channel.send(codeBlock("bash", data)).catch(err => console.log(err));
                });

                child.stderr.on('data', async function (data) {
                    await message.channel.send(codeBlock("bash", data)).catch(err => console.log(err));
                });

                child.on('close', (code) => {
                    message.channel.send(codeBlock("bash", `Exited with code ${code}`)).catch(err => console.log(err));
                });

            } else {
                const ReplyEmbed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription('You are not Authorized to Access!')
                    .setTimestamp()

                return message.reply({
                    content: `Command: \`${consoleComm}\``,
                    embeds: [ReplyEmbed]
                });
            }
        };
    }
};