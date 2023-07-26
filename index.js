const mongoose = require("mongoose");
const { Telegraf, Markup} = require("telegraf");
const { config } = require("dotenv");
const CronJob = require("cron").CronJob;
const { getString } = require("./functions/getString");
const { update_keys, region_keys, set_region_keys } = require("./constants/keyboards");
const User = require("./models/users")
const { regions, regions_string, set_regions_string } = require("./constants/regions");

config();
const bot = new Telegraf(process.env.BOT_TOKEN,{family: 4});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const test= new CronJob('0 6 * * *',async function (){
  const Users= await User.find({notification:true});
  Users.forEach(async (user) => {
    bot.telegram.sendMessage(user.user_id,await getString(user.region.name, user.region.id),update_keys)
  })
},null,true,'Asia/Tashkent')

bot.start( async (ctx) => {
  await ctx.reply(
    "Salom `" +
      await ctx.chat.first_name +
      "` bu bot sizga har kunlik namoz vaqtlarini o'z mintaqangizga qarab avtomatik tarzda yuborib turadi.\n\nBot hozirda test rejimida ishlamoqda agar xatolik mavjud bo'lsa @rtokhirov bilan bog'lanishingizni so'raymiz.",
      Markup.inlineKeyboard([
        [Markup.button.callback("Boshlash", "menu")],
      ])
  );
});

bot.action("menu", async(ctx) => {
  await ctx.answerCbQuery();
  try {
    const user = await User.findOne({ user_id: ctx.from.id });
    if (!user) {
      if(!ctx.from.username){
        ctx.from.username=""
      }
      return await ctx.reply(
        `${name} siz viloyatlardan birini tanlang va biz shu viloyatning namoz vaqtlarini har kuni yuborib turamiz.`,
        set_region_keys
      );
    } else { 
      const time = new Date(user.createdAt).toLocaleDateString()
      ctx.reply(
        `Foydalanuvchi: ${user.first_name}\nMintaqa: ${user.region.name}\nHar kuni sms jo'natish: ${user.notification?"faol":"faol emas"}\nRo'yxatdan o'tgan sana: ${time}\n`,
        Markup.inlineKeyboard([
          [Markup.button.callback(`${user.region.name} namoz vaqtlari`, `${user.region.action_name}`)],
          [Markup.button.callback("Mintaqani o'zgartish", "change")],
          [Markup.button.callback("Kunlik smsni o'zgartirish", "notification")],
          [Markup.button.url("Muallif", "https://t.me/Tony_TimeUz")],
        ])
      );
    }
  } catch (error) {
    console.log(`menudagi xatolik`,error);
  }

});

bot.action("others", async(ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("Viloyatlardan birini tanlang: ", region_keys);
});

bot.action("change", async(ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("O'zingiz yashaydigan mintaqani tanlang, kunlik sms shu mintaqa bo'yicha yuboriladi.", set_region_keys);
});

bot.action("notification", async(ctx) => {
  await ctx.answerCbQuery();
    try {
      const user = await User.findOne({user_id: ctx.from.id})
      console.log(user);
      await ctx.reply(`${user.first_name}, agar kunlik smsni ${user.notification?"o'chirsangiz":"yoqsangiz"} sizga har kuni soat 6:00 da sms ${user.notification?"yuborilmaydi":"yuboriladi"}`,
      Markup.inlineKeyboard([
        [Markup.button.callback(`Kunlik smsni ${user.notification?"o'chirish":"yoqish"}`,'mute')]
      ]));
    } catch (error) {
      console.log(error);
    }
});

bot.action('mute',async(ctx)=>{
  await ctx.answerCbQuery();
  try {
    const user = await User.findOne({user_id: ctx.from.id})
    await User.updateOne({user_id: ctx.from.id},{
      notification:!user.notification
    })
    const time = new Date(user.createdAt).toLocaleDateString()
    await ctx.answerCbQuery( `Kunlik sms ${user.notification?"o'chirildi":"yoqildi"}`)
    await ctx.reply(
      `Foydalanuvchi: ${user.first_name}\nMintaqa: ${user.region.name}\nHar kuni sms jo'natish: ${user.notification?"faol emas":"faol"}\nRo'yxatdan o'tgan sana: ${time}\n`,
      Markup.inlineKeyboard([
        [Markup.button.callback(`${user.region.name} namoz vaqtlari`, `${user.region.action_name}`)],
        [Markup.button.callback("Mintaqani o'zgartish", "change")],
        [Markup.button.callback("Kunlik smsni o'zgartirish", "notification")],
        [Markup.button.url("Muallif", "https://t.me/Tony_TimeUz")],
      ])
    );
  } catch (error) {
    console.log(error);
  }
})

bot.on("callback_query", async (ctx) => {
  await ctx.answerCbQuery();
  if (regions_string.includes(ctx.callbackQuery.data)) {
    try {
      const region = regions.find(
        (reg) => reg.action_name === ctx.callbackQuery.data
      );
      ctx.reply(await getString(region.name, region.id), update_keys);
    } catch (error) {
      console.log("regionlardagi xatolik", error);
    }
  } else if (set_regions_string.includes(ctx.callbackQuery.data)) {
    let regionName = ctx.callbackQuery.data.split("set").pop();
    try {
      const user = await User.findOne({user_id: ctx.from.id});
      const region = regions.find((reg) => reg.action_name === regionName);
      if (!user) {
        const newUser = await User.create({
          first_name: ctx.from.first_name,
          user_id: ctx.from.id,
          username: ctx.from.username,
          region: region,
        });
        const time = new Date(newUser.createdAt).toLocaleDateString();
        ctx.reply(
          `Foydalanuvchi: ${newUser.first_name}\nMintaqa: ${
            newUser.region.name
          }\nHar kuni sms jo'natish: ${
            newUser.notification ? "faol" : "faol emas"
          }\nRo'yxatdan o'tgan sana: ${time}\n`,
          Markup.inlineKeyboard([
            [Markup.button.callback("Mintaqani o'zgartish", "change")],
          ])
        );
        ctx.reply(await getString(region.name, region.id), update_keys);
      } else {
          try {
            await User.updateOne({user_id:ctx.from.id },{region:region})
            const user = await User.findOne({user_id: ctx.from.id});
            const time = new Date(user.createdAt).toLocaleDateString();
          ctx.reply(
            `Foydalanuvchi: ${user.first_name}\nMintaqa: ${
              user.region.name
            }\nHar kuni sms jo'natish: ${
              user.notification? "faol" : "faol emas"
            }\nRo'yxatdan o'tgan sana: ${time}\n`,
            Markup.inlineKeyboard([
              [Markup.button.callback("Mintaqani o'zgartish", "change")],
              [Markup.button.callback("Kunlik smsni o'zgartirish", "notification")],
            ]) 
          );
            ctx.answerCbQuery(`Mintaqangiz ${user.region.name}ga o'zgardi`)
            ctx.reply(await getString(user.region.name, region.id), update_keys);
          } catch (error) {
            console.log("updateda xatolik",error);
          }
      }
    } catch (error) {
      console.log("user yaratishda xatolik", error);
    }
  }
});

bot.launch().then(console.log("bot started"));
module.exports.bot = bot;
