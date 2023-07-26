// import { Bot} from "grammy";
// import * as cheerio from 'cheerio'
// import axios from "axios";

// import { regions } from "./constants/regions.js";
// import months from "./constants/months.js";
// import days from "./constants/days.js";

// const bot = new Bot("6351335183:AAFJGvqdwqQPwPzf9nBLxN9W6jzWFFrh8u4")

// bot.command('start', ctx=>{
//     // console.log(ctx.message);
//     ctx.reply("Huduni tanlang: ",{
//         reply_markup:{
//             inline_keyboard:
//                 regions.map(reg=>[{text: reg.name, callback_data:reg.id}])
//         }
//     })
// })

// bot.on('callback_query', async ctx=>{
//     const reg_id=ctx.callbackQuery.data
//     // console.log(ctx.callbackQuery);
//     const date= new Date()
//     const year= date.getFullYear()
//     const month= date.getMonth()+1;
//     const monthName= months[date.getMonth()]
//     const weekday=days[date.getDay()]
//     const day=date.getDate()
//     const res= await axios.get(`https://islom.uz/vaqtlar/${reg_id}}/${month}`)
//     const $ = cheerio.load(res.data);
//     const tong = $("tr.bugun>td:nth-child(4)").text();
//     const quyosh = $("tr.bugun>td:nth-child(5)").text();
//     const peshin = $("tr.bugun>td:nth-child(6)").text();
//     const asr = $("tr.bugun>td:nth-child(7)").text();
//     const shom = $("tr.bugun>td:nth-child(8)").text();
//     const xufton = $("tr.bugun>td:nth-child(9)").text();
//     const text=`☪️ ${year} - yil\n📆 ${day}-${monthName} ${weekday}\n\n🕌  ${regions.find(reg=>reg_id==reg.id).name} vaqti\n\n🏙 Tong - ${tong}\n🌄 Quyosh - ${quyosh}\n☀️ Peshin - ${peshin}\n🌇 Asr - ${asr}\n🌆 Shom - ${shom}\n🌃 Xufton - ${xufton}\n\n@namoz_timeuzbot\n🌐 Manba: islom.uz`
//     ctx.reply(text);

// })


// bot.start({
//     // allowed_updates:['callback_query','inline_query']
// }).then(console.log("bot started"))


// "6351335183:AAFJGvqdwqQPwPzf9nBLxN9W6jzWFFrh8u4"