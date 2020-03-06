const Discord = require("discord.js");
const fs = require("fs");
const client= new Discord.Client();
const prefix = '//';
require('dotenv').config();
const token = process.env.TOKEN;
var creeperSaid = false;
var totalSeconds = 0, onOffTimer = 0, rSecundeTotale = 0;
var hour=0,minute=0,seconds=0;
var BilaCounter = parseInt(fs.readFileSync('BilaCounter.txt', 'utf8'));
var output;
var d, _second, _hour, _minutes;
var sessionNumber = parseInt(fs.readFileSync('sessionNumber.txt', 'utf8'));

const helpEmbed = new Discord.MessageEmbed()
  .setColor('#000000')
  .setTitle('NLXbot | Help')
  .setURL('https://youtube.com/c/namelessx/')
  .setAuthor('de namelessx', 'https://i.imgur.com/srWkBej.png', 'https://youtube.com/c/namelessx/')
  .addField(`${prefix}commandhelp`, '_Tot ajutorul pentru comenzile BOT-ului_')
  .addField(`${prefix}replyhelp`, '_Tot ajutorul pentru raspunsurile BOT-ului_')
  .setTimestamp()
  .setFooter('NLXbot', 'https://i.imgur.com/srWkBej.png')

const helpCommandEmbed = new Discord.MessageEmbed() //help pentru comenzi
  .setColor('#ff00d7')
  .setTitle('NLXbot | Comenzi')
  .setURL('https://youtube.com/c/namelessx/')
  .setAuthor('de namelessx', 'https://i.imgur.com/srWkBej.png', 'https://youtube.com/c/namelessx/')
  .setDescription(`Toate comenzile incep cu prexiul **${prefix}**`)
  .addField(`${prefix}session`, '_Arata numarul sesiunii active._')
  .addField(`${prefix}remind **(WIP)**`, '_Reaminteste ceva._', true)
  .addField(`${prefix}remindInfo **(WIP)**`, '_Arata reamintirea activa._')
  .addField(`${prefix}sterge <numar mesaje>`, '_Sterge un anumit numar de mesage_\n_**Aceasta comanda nu va merge cu mesaje mai vechi de 2 saptamani**_')
  .setTimestamp()
  .setFooter('NLXbot', 'https://i.imgur.com/srWkBej.png')

const helpReplyEmbed = new Discord.MessageEmbed() //help pentru reply-uri
  .setColor('#0099ff')
  .setTitle('NLXbot | Raspunsuri')
  .setURL('https://youtube.com/c/namelessx/')
  .setAuthor('de namelessx', 'https://i.imgur.com/srWkBej.png', 'https://youtube.com/c/namelessx/')
  .setDescription('Aceste comenzi pot fi executate oricand intr-un mesaj.')
  .addField('Toate comezile pentru BOT-ul de muzica care nu sunt executate in canalui de #muzica vor fi sterse', '...alaturi de un mesaj privat.')
  .addField('bylaboy', '_Cuvantul interzis..._')
  .addField('boomer', '_...si **zoomer**_', true)
  .addField('sall', '_alaturi de **pugi sula**_')
  .addField('unghie' , '_unghie ala care il suge x10_', true)
  .addField('creeper', '_Tot refrenul de la melodia lui CaptainSparkles_')
  .setTimestamp()
  .setFooter('NLXbot', 'https://i.imgur.com/srWkBej.png')

function dateLog(){ // primeste timpul curent
    d = new Date();
    _second = d.getSeconds();
    _hour = d.getHours();
    _minutes = d.getMinutes();
    output = `[${_hour}:${_minutes}:${_second}] `;
}

client.once('ready', () => { //pornirea BOT-ului
    sessionNumber++;
    fs.writeFileSync('sessionNumber.txt', sessionNumber);
    dateLog();
    console.log('a venit nebunul de salam (bot pornit)')
    fs.appendFileSync("log.txt",`\n\nSESIUNE NOUA | NR.${sessionNumber} |\n${output} Botul tocmai a pornit.`)
    console.log(`\n\nSESIUNE NOUA | NR.${sessionNumber} |\n${output} Botul tocmai a pornit.`)
    client.user.setPresence({
        game: {
            name: "\"Bill\"",
            type: "LISTENING"
        }
    })
})
//
// USER JOIN
//
client.on('guildMemberAdd', guildMember => {
    if(guildMember.id === "474901267362217984"){
        guildMember.send("du-te la highman :*").then(guildMember.kick())
    }
})
//
// COMENZI
//
client.on('message', async message => { //de fiecare data cand se trimite un mesaj
    //initiere pentru comenzi
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    if(!message.guild) return
    if(!message.content.startsWith(prefix)) return
    if(!message.member) message.member = await message.guild.fetchMember(message) //detectarea cand se primeste o comanda

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase(); //despartirea parametrilor

    try{

    if(command === "help"){
        message.author.send(helpEmbed)
        message.delete()
        console.log(`\n${output} ${message.member.user.tag} a folosit comanda "help".`)
    }

    if(command === "commandhelp"){
        message.author.send(helpCommandEmbed)
        message.delete()
        console.log(`\n${output} ${message.member.user.tag} a folosit comanda "commandhelp".`)
    }

    if(command === "replyhelp"){
        message.author.send(helpReplyEmbed)
        message.delete()
        console.log(`\n${output} ${message.member.user.tag} a folosit comanda "replyhelp".`)
    }

    //comanda pentru inceperea unui server
    if(command == "start"){
        message.channel.send("Salut! Bun venit la serveul lui Vlad _(nlx)_!")
        message.channel.send("Aici Vlad v-a testa botul care a dat mesajul asta!")
        message.channel.send("De obicei, decat eu sau Mihai bagam oameni pe server.")
        message.channel.send("Daca ai o suggestie pentru bot poti mereu sa ii dai tag lui Vlad _(@nlx)_")
        message.channel.send("**acum mars drq de aici si du-te pe alt canal**")
        message.react('👌')
        dateLog();fs.appendFileSync("log.txt",`\n${output} ${message.member.user.tag} a folosit comanda "start".`);
        console.log(`\n${output} ${message.member.user.tag} a folosit comanda "start".`);
    }

    if(command === "session"){ //sesiune activa
        message.reply(`BOT-ul se afla in a ${sessionNumber}-a sesiune activa.`)
        dateLog();fs.appendFileSync("log.txt",`\n${output} ${message.member.user.tag} a folosit comanda "session".\n>>Botul se afla in a ${sessionNumber}-a sesiune functionala. YAY!`)
        console.log(`\n${output} ${message.member.user.tag} a folosit comanda "session".\n>>Botul se afla in a ${sessionNumber}-a sesiune functionala. YAY!`)
    }
    //reamintire (timer)
    if(command === "remind"){
        if(!args[0] || !args[1]){
            message.reply(`te rog precizeaza in cat timp vrei sa iti aduc aminte de ceva.\n Comanda este: _${prefix}remind <secunde> <task>_`)
        } else {
            rSecundeTotale = args[0]
            var rTask = args[1]
            remindTimer()
        }
    }

    if(command === "remindInfo"){
        if(rSecundeTotale === 0){
            message.reply(`momentan nu ai nici un reminder pus.`)
        } else {
            message.reply(`task-ul ${rTask} va fi reamintit in ${rSecundeTotale} (de) secunde.`)
        }
    }
    //

    if(command === "log"){
        dateLog();fs.appendFileSync("log.txt",`\n${output} Comanda de log a fost folosita de ${message.member.user.tag}`);
        console.log(`\n${output} Comanda de log a fost folosita de ${message.member.user.tag}`)
    }

    //sterge
    if(command === "sterge"){
        const amount = parseInt(args[0]) + 1;

        dateLog();fs.appendFileSync("log.txt",`\n${output} ${message.member.user.tag} a folosit comanda "sterge", s-au sters ${amount} mesaje.`);
        console.log(`\n${output} ${message.member.user.tag} a folosit comanda "amount", s-au sters ${amount} mesaje.`);

        if(isNaN(amount)){
            message.reply(" hmm, nu pare a fi un numar valid")
        } else if (amount <= 1 || amount >= 100) {
            message.reply(" trebuie sa alegi un numar intre 1 si 100")
        } else {
            message.channel.bulkDelete(amount)
        }
    }

  } catch (e) {
      console.log(e);
  }
})

//
// RASPUNSURI
//
client.on('message',message => {

    try {

    if(message.channel.id !== "648219216456974336" && message.guild.id === "609880608260489217"){
        if(message.content.startsWith(`-skip`) || message.content.startsWith(`-play`) || message.content.startsWith(`-loop`) || message.content.startsWith(`-stop`) || message.content.startsWith(`-queue`) && !message.author.bot){
            message.delete();
            message.author.send(`fmm nu mai scrie comenzi de muzica in ${message.channel} pe serverul ${message.guild}`);
            dateLog();fs.appendFileSync("log.txt",`\n${output} ${message.member.user.tag} a scris o comanda de muzica pe alt canal.`);
            console.log(`\n${output} ${message.member.user.tag} a scris o comanda de muzica pe alt canal.`)
        }
    }

    if(message.content.includes(`bylaboy`) || message.content.includes(`Bylaboy`) || message.content.includes(`BYLABOY`) && !message.author.bot){
        const kickByla = message.author
        console.log(kickByla.username + " a zis cuvantul interzis")
        if(kickByla){
            dateLog();fs.appendFileSync("log.txt",`\n${output} ${message.member.user.tag} a zis cuvantul interzis.`);
            console.log(`\n${output} ${message.member.user.tag} a zis cuvantul interzis.`);
            try {message.guild.members.get(kickByla.id).kick().then(message.channel.send("User-ul "+kickByla+" a spus cuvantul interzis..."+`\n_${kickByla} si-a luat kick_`))}
            catch {message.channel.send("User-ul "+kickByla+" nu a putut fi dat afara din cauza ca are rank-ul mai mare decat bot-ul\n_Ai scapat de data asta..._")}}
    }

    if(message.content.includes(`boomer`) && !message.author.bot){
        message.channel.send("ok zoomer | " + message.author)
    }

    if(message.content.includes(`zoomer`) && !message.author.bot){
        message.channel.send("ok boomer | " + message.author)
    }

    //sall -> pugi sula
    if(message.content.startsWith(`sall`) && !message.author.bot){
        message.channel.send("pugi sula")
    }

    if(message.content.startsWith(`pugi sula`) && !message.author.bot){
        message.channel.send("sall")
    }

    if(message.content.startsWith(`unghie`) || message.content.startsWith(`Unghie`) && !message.author.bot){
        for(var i=0;i<=10;i++){
            message.channel.send("unghie ala care il suge")
        }
    }

    //creeper aw man chain
    if(message.content.startsWith(`creeper`)){
        message.channel.send("aw man")
        creeperSaid = false
    } else if(message.content.startsWith(`so we back in the mine`)){
        message.channel.send("got our pickaxe swinging from")
    } else if(message.content.startsWith(`side to side`)){
        message.channel.send("side side to side")
    } else if(message.content.startsWith(`this task a gruelling one`)){
        message.channel.send("hope to find some diamonds tonight night night")
    } else if(message.content.startsWith(`diamonds tonight`)){
        message.channel.send("heads up")
    } else if(message.content.startsWith(`you hear a sound`)){
        message.channel.send("turn around and look up")
    } else if(message.content.startsWith(`total shock fills your body`)){
        message.channel.send("oh no its you again")
    } else if(message.content.startsWith(`i can never forget those eyes eyes eyes`)){
        message.channel.send("eyes eyes eyes")
    } else if(message.content.startsWith(`cause baby tonight`) && creeperSaid === false){
        message.channel.send("the creeper's tryna steal our stuff again")
        creeperSaid = true
    } else if(message.content.startsWith(`cause baby tonight`) && creeperSaid === true){
        message.channel.send("you grab your pick shovel and bolt again")
        creeperSaid = false
    } else if(message.content.startsWith(`bolt again-gain`)){
        message.channel.send("and run run")
    } else if(message.content.startsWith(`until it's done done`)){
        message.channel.send("until the sun comes up in the morn")
    }

  } catch (e) {
    console.log(e);
  }
})

client.login(token);
