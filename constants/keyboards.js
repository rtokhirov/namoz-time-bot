const { Markup } = require("telegraf");

module.exports.set_region_keys = Markup.inlineKeyboard([
  [
    Markup.button.callback("Andijon", "setandijon"),
    Markup.button.callback("Buxoro", "setbuxoro"),
  ],
  [
    Markup.button.callback("Farg'ona", "setfargona"),
    Markup.button.callback("Jizzah", "setjizzah"),
  ],
  [
    Markup.button.callback("Namangan", "setnamangan"),
    Markup.button.callback("Navoiy", "setnavoiy"),
  ],
  [
    Markup.button.callback("Qashqadaryo", "setqashqadaryo"),
    Markup.button.callback("Qoraqalpog'iston", "setqoraqalpogiston"),
  ],
  [
    Markup.button.callback("Samarqand", "setsamarqand"),
    Markup.button.callback("Sirdaryo", "setsirdaryo"),
  ],
  [
    Markup.button.callback("Surxondaryo", "setsurxondaryo"),
    Markup.button.callback("Toshkent", "settoshkent"),
  ],
  [
    Markup.button.callback("Xorazm", "setxorazm"),
    Markup.button.callback("Menu", "menu")
  ],
]);

module.exports.region_keys = Markup.inlineKeyboard([
  [
    Markup.button.callback("Andijon", "andijon"),
    Markup.button.callback("Buxoro", "buxoro"),
  ],
  [
    Markup.button.callback("Farg'ona", "fargona"),
    Markup.button.callback("Jizzah", "jizzah"),
  ],
  [
    Markup.button.callback("Namangan", "namangan"),
    Markup.button.callback("Navoiy", "navoiy"),
  ],
  [
    Markup.button.callback("Qashqadaryo", "qashqadaryo"),
    Markup.button.callback("Qoraqalpog'iston", "qoraqalpogiston"),
  ],
  [
    Markup.button.callback("Samarqand", "samarqand"),
    Markup.button.callback("Sirdaryo", "sirdaryo"),
  ],
  [
    Markup.button.callback("Surxondaryo", "surxondaryo"),
    Markup.button.callback("Toshkent", "toshkent"),
  ],
  [
    Markup.button.callback("Xorazm", "xorazm"),
    Markup.button.callback("Menu", "menu")
  ],
]);

module.exports.update_keys = Markup.inlineKeyboard([
  [Markup.button.callback("Boshqa hududlar", "others")],
  [Markup.button.callback("Menu", "menu")],
]);
