const Discord = require("discord.js");
require('dotenv').config();
const fs = require("fs");
const client= new Discord.Client();
const prefix = '//';
var creeperSaid = false;
var totalSeconds = 0, onOffTimer = 0, rSecundeTotale = 0;
var hour=0,minute=0,seconds=0;
var BilaCounter = parseInt(fs.readFileSync('BilaCounter.txt', 'utf8'));
var output;
var d, _second, _hour, _minutes;
var sessionNumber = parseInt(fs.readFileSync('sessionNumber.txt', 'utf8'));

function dateLog(){
    d = new Date();
    _second = d.getSeconds();
    _hour = d.getHours();
    _minutes = d.getMinutes();
    output = `[${_hour}:${_minutes}:${_second}] `;
}

function countTimer() {
    if(onOffTimer){
        totalSeconds = totalSeconds + 1;
        hour = Math.floor(totalSeconds /3600);
        minute = Math.floor((totalSeconds - hour*3600)/60);
        seconds = totalSeconds - (hour*3600 + minute*60);
        setTimeout(countTimer, 1000);
    }
}

client.once('ready', () => {
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
// COMENZI
//
client.on('message', async message => {
    //initiere pentru comenzi
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if(!message.guild) return
    if(!message.content.startsWith(prefix)) return
    if(!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

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

    if(command === "session"){
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

    //timer cand botul intra intr-un vc
    if(command === "coltul"){
        if(!message.member.voiceChannel){
            message.channel.sendMessage("Nu esti intr-un VC ca sa vezi cat am stat in coltul rusinii")
        } else {
            message.channel.sendMessage("Redau linistea de "+hour+" ore, "+minute+" minute si "+seconds+" (de) secunde.")
        }
        dateLog();fs.appendFileSync("log.txt",`\n${output} ${message.member.user.tag} a folosit comanda "coltul".`);
        console.log(`\n${output} ${message.member.user.tag} a folosit comanda "coltul".`)
    }

    if(command === "vinemamaluibila"){
        BilaCounter++
        fs.writeFileSync('BilaCounter.txt', BilaCounter)
        message.reply(` Ma-sa lui Bila a zis ca il duce pe Mario la politie, dar nu a facut asta. (${BilaCounter} ori)`)
        dateLog();fs.appendFileSync("log.txt",`\n${output} ${message.member.user.tag} a folosit comanda "vinemamaluibila" (de ${BilaCounter}).`);
        console.log(`\n${output} ${message.member.user.tag} a folosit comanda "vinemamaluibila" (de ${BilaCounter}).`)
    }

    if(command === "mamaluibilainvizita"){
        message.reply(` Ma-sa lui Bila a zis ca il duce pe Mario la politie de  ${BilaCounter} ori, dar nu a facut asta.`)
        dateLog();fs.appendFileSync("log.txt",`\n${output} ${message.member.user.tag} a folosit comanda "mamaluibilainvizita".`);
        console.log(`\n${output} ${message.member.user.tag} a folosit comanda "mamaluibilainvizita".`)
    }

    if(command === "log"){
        dateLog();fs.appendFileSync("log.txt",`\n${output} Comanda de log a fost folosita de ${message.member.user.tag}`);
        console.log(`\n${output} Comanda de log a fost folosita de ${message.member.user.tag}`)
    }

    //bila e prost?

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
})

//
// RASPUNSURI
//
client.on('message',message => {


    if(message.content.startsWith(`munlai`) && !message.author.bot){
        if(message.guild.voiceConnection){
            message.dispatcher.end()
            message.member.voiceChannel.leave()
        }
    }

    if(message.channel.id !== "648219216456974336"){
        if(message.content.startsWith(`-skip`) || message.content.startsWith(`-play`) || message.content.startsWith(`-loop`) || message.content.startsWith(`-stop`) || message.content.startsWith(`-queue`) && !message.author.bot){
            message.delete();
            message.channel.send(`fmm nu mai scrie comenzi de muzica in chat | ${message.author}`).then(delMessage => {delMessage.delete(5000); });
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
})

client.login("NjA5ODc5NjE4Mzg3ODM2OTQw.XmEK6w.uyUO0XtT-rVkB75WHlEKMclR8do");
