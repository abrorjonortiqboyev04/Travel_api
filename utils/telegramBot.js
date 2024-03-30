const { newUser, isFollow, user} = require('./bot.event')


const telegramBot = function(){
    
    const Bot = require('node-telegram-bot-api')
    const token = process.env.BOT_TOKEN

    const newBot = new Bot(token, {polling: true})

    newBot.setMyCommands([
        {
            command: '/start',
            description: "Botni ishga tushirish!!"
        },
        {
            command: '/youtube',
            description: "YouTube ni ochish!"
        }
    ])
 
    const button = {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: 'YouTube',
                        web_app: {
                            url: 'https://youtube.com'
                        }
                    }
                    
                ]
            ]
        }
    }


    newBot.on('message', async (msg)=>{
        const chatId = msg.chat.id

        if(msg.text==='/start' && isFollow(msg)){
            newUser(msg)
            return await newBot.sendMessage(chatId,
                 `Salom ${msg.chat.first_name}. 
Sotib olingan chiptani tekshirish uchun telefon raqamini yuboring.
Masalan: 📞+998901234567 `)
        }
        
        else if(msg.text==='/youtube' && isFollow(msg)){
            return await newBot.sendMessage(chatId, `Salom ${msg.chat.first_name}`, button)
        }

        return user(msg,newBot)
    
    })
}


module.exports = telegramBot
