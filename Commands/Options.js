const Discord = require("discord.js");
const Database = require("../Helpers/Database");
// exports.onLoad = (client) => {};
/**
client.on('message', message => {

    const args = message.content.slice(prefix.length).split(/ +/);

    let newlog = message.content.split(" ").slice(1).join(" ")
    
    if(message.content.startsWith(prefix + 'setinvite')) {
        var nick = JSON.parse(fs.readFileSync("config.json", "utf8"))
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Sorry, you don't have permissions to do this!You need role that have permission **Manager Channel** | **Administrator**");
         var inputmessage = message.mentions.channels.first()
        if (args[0]) {
          nick[message.guild.id] = {
            nick: inputmessage.id
         };
          fs.writeFile("config.json", JSON.stringify(nick), (err) => {
            if (err) console.log(err)
         });
          
         let embed = new MessageEmbed()
          .setColor("#32d732")
          .setDescription(`invite-tracker set to\n\n${inputmessage}`)
          .setTimestamp()
          message.channel.send({embed});
        } }
 
    })

    client.on('guildMemberAdd', async member => {
        if (!member || !member.id || !member.guild) return;
        const guild = member.guild;
      
        var welcome = JSON.parse(fs.readFileSync("server.json", "utf8"));
        if (!welcome) return;
        let channel = member.guild.channels.cache.get(
          `${welcome[member.guild.id].nick}`
        );
        if (!channel) return;

        const cachedInvites = guildInvites.get(member.guild.id);
        const newInvites = await member.guild.fetchInvites();
        guildInvites.set(member.guild.id, newInvites);
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses)
        
        let createdAt = moment(member.createdAt).format('LLLL');

        let embed = new MessageEmbed()
        // .setTitle(`Welcome to ${member.guild.name}`)
        .setColor("RANDOM")
        .setDescription(`<a:RGB:781164737936359441> 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 ${member} 𝐓𝐨 <a:6209_gift10:781164741506105355> **${member.guild.name}** <a:6209_gift10:781164741506105355> \n <a:RGB:781164737936359441> 𝐈𝐧𝐯𝐢𝐭𝐞 𝐁𝐲: <@${usedInvite.inviter.id}>\n <a:RGB:781164737936359441> 𝐈𝐧𝐯𝐢𝐭𝐞: ${usedInvite.uses} \n <a:RGB:781164737936359441> 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐂𝐫𝐞𝐚𝐭𝐞 : ${createdAt} \n <a:RGB:781164737936359441> 𝐓𝐨𝐭𝐚𝐥 ${member.guild.memberCount} 𝐌𝐞𝐦𝐛𝐞𝐫 𝐈𝐧 𝐒𝐞𝐫𝐯𝐞𝐫`)
        .setTimestamp()

        if(channel){
            channel.send(embed).catch(err => console.log(err))
        }
