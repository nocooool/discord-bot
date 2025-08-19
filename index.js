import { Client, Events, GatewayIntentBits } from "discord.js";
import pingCommand from "./commands/ping";
import jokes from "./commands/ur";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! ✅ Logged in as ${client.user.tag}}`);
});

//jokes
client.on("messageCreate", (message) => {
    if(message.author.bot) return;

    const prefix = "!";
    if(!message.content.startsWith(prefix)) return;

    const fullCommand = message.content.slice(prefix.length).toLowerCase();

    if(fullCommand === jokes.name){
        jokes.execute(message);
    }
})

//for ping pong message
client.on("messageCreate", (message) =>{
    if(message.author.bot) return; //ignore the bots or itself

    const prefix = "!";
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === pingCommand.name){
        pingCommand.execute(message, args);
    }

//     if(message.content === "!ping"){
//         message.reply("Pong! 🏓");
//     }
});


client.login(Bun.env.TOKEN)