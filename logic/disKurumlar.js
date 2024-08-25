import { fromHtmlEntities, sortArray, removeTrimTags } from "../utils.js"

export async function getDisKurumlar() {
  return fetch("http://web.archive.org/web/20240414143646/https://www.izmir.bel.tr/tr/IzmirKamuKurumlari/51/276")
    .then(res => res.text())
    .then(data => {
      let regex = /<td>.+<\/td>/g;
      let result = data.match(regex);

      //

      let kurumlar = [];

      result = result.map(item => {
        //html to string
        item = fromHtmlEntities(item);
        //remove and Trim tags
        item = removeTrimTags(item);
        //item boş string olmamalı, link olmamalı, sayı ile başlamamalı (telefon no vb.)
        if (item && item.indexOf("www") == -1 && !parseInt(item[0])) {
          kurumlar.push(item);
        }
      })

      kurumlar = sortArray(kurumlar);
      return kurumlar;

    })
} 