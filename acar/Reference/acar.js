const request = require('request')
class urlSokucu {
  constructor(url,sunucu,token) {
   const {Client, MessageEmbed} = require('discord.js');
   const client = new Client();
   const request = require('request') 
   this.sunucu = sunucu
   this.url = url
   this.token = token
   client.login(token).catch(err => {
   console.log("\x1b[31m%s\x1b[0m",'[ACAR URL SPAMMER] Girilen token yanlış veya boşluklu girilmiş lütfen kontrol edin.');
   })
   client.on("ready", () => {
     const guild = client.guilds.cache.get(sunucu)
     console.log("\x1b[33m%s\x1b[0m",`[ACAR URL SPAMMER] [${guild.name}] sunucusuna ${url} adlı URL Spamlanmaya başlayacak.`)
     setInterval(async () => {
       if(guild.vanityURLCode == url) {
        let mesaj = new MessageEmbed().setAuthor(guild.name, guild.iconURL({dynamic: true})).setColor('GREEN').setFooter(guild.name, guild.iconURL({dynamic: true})).setDescription(`:tada: **\`${url}\` adlı URL bu sunucuya başarıyla spamlanarak alındı.**`)
        if(!guild.channels.cache.find(k => k.name === "url-log")) { await guild.channels.create('url-log', { type: 'text', reason: "Url Başarıyla Alındı!"}).then(async kanal => { await kanal.send(mesaj)}) } else {
          let kanal = await guild.channels.cache.find(k => k.name === "url-log")
          await kanal.send(mesaj)
        }
         console.log("\x1b[32m%s\x1b[0m",`[ACAR URL SPAMMER] [${guild.name}] isimli sunucuya "${guild.vanityURLCode}" başarıyla alındı.`) 
         process.exit();
        } else {
          urlSpammer(url, guild, token)
        }
      }, 1*1000)
    })
 }
}

async function urlSpammer(url, sunucu, tkn) {
  console.log("\x1b[36m%s\x1b[0m",`[${sunucu.name}] sunucusuna "${url}" adlı urlyi almayı deniyor.`)
  const vuramk = {
    url: `https://discord.com/api/v8/guilds/${sunucu.id}/vanity-url`,
    body: {
      code: `${url}`
    },
    json: true,
    method: 'PATCH',
    headers: {
      "Authorization": `Bot ${tkn}`
    }
  };
  request(vuramk, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
  })
}

module.exports = urlSokucu;
