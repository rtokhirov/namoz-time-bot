const cheerio = require('cheerio')
const { months } = require('../constants/months')
const { days } = require('../constants/days')
const { default: axios } = require('axios')

module.exports.getString= async(reg_name,reg_id)=>{
    const date= new Date()
    const year= date.getFullYear()
    const month= date.getMonth()+1;
    const monthName= months[date.getMonth()]
    const weekday=days[date.getDay()]
    const day=date.getDate()
    const res= await axios.get(`https://islom.uz/vaqtlar/${reg_id}}/${month}`)
    const $ = cheerio.load(res.data);
    const tong = $("tr.bugun>td:nth-child(4)").text();
    const quyosh = $("tr.bugun>td:nth-child(5)").text();
    const peshin = $("tr.bugun>td:nth-child(6)").text();
    const asr = $("tr.bugun>td:nth-child(7)").text();
    const shom = $("tr.bugun>td:nth-child(8)").text();
    const xufton = $("tr.bugun>td:nth-child(9)").text();
    const text=`☪️ ${year} - yil\n📆 ${day}-${monthName} ${weekday}\n\n🕌  ${reg_name} vaqti\n\n🏙 Tong - ${tong}\n🌄 Quyosh - ${quyosh}\n☀️ Peshin - ${peshin}\n🌇 Asr - ${asr}\n🌆 Shom - ${shom}\n🌃 Xufton - ${xufton}\n\n@namoz_timeuzbot\n🌐 Manba: islom.uz`
    return text
}