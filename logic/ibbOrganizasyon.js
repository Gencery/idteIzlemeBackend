import { decodeHtmlEntities } from "../utils.js"
import { sortArray, capitalizeText } from "../utils.js";

// export async function getIbbOrg() {
//   return fetch("https://web.archive.org/web/https://www.izmir.bel.tr/tr/Birimler/289")
//     .then(res => res.text())
//     .then(data => {

//       let regex = /<span class="(adsoyad|baslik)">.+<\/span>/g;
//       let result = data.match(regex);

//       function trimBirim(nodeStr) {
//         return nodeStr.replace(/<[^>]+>/g, '').trim();
//       }

//       let organizasyon = [];

//       result = result.map(item => {
//         let trimmedItem = trimBirim(item);
//         //(1 ) -> (1) Hukuk müşaviri
//         if (trimmedItem.includes("(1 )")) {
//           trimmedItem = trimmedItem.replace("(1 )", "(1) ");
//         }
//         let trimmedItemLength = trimmedItem.length;

//         //Tamamı büyük harf olan isimleri alma
//         if (trimmedItem[trimmedItemLength - 1].toLowerCase() != trimBirim(item)[trimmedItemLength - 1]) {
//           return;
//         }
//         else if (item.includes("baslik")) {
//           organizasyon.push({ baskanlikAdi: trimmedItem, birimler: [] });
//         }
//         else if (item.includes("adsoyad")) {
//           let currentIndex = organizasyon.length - 1;
//           organizasyon[currentIndex].birimler.push(trimmedItem);
//         }
//         else {
//           console.error("Baskanlık veya birim değil!");
//         }
//       })

//       //baskanlik adina gore sırala
//       organizasyon = sortArray(organizasyon, "baskanlikAdi");

//       //müdürlük adına göre sırala
//       organizasyon.forEach((item) => {
//         sortArray(item.birimler);
//       });

//       return organizasyon.slice(2);
//     })
// }


export async function getIbbOrg() {
  return fetch("https://eislem.izmir.bel.tr/tr/EvrakOnayYetkiliListesi/")
    .then(res => res.text())
    .then(data => {



      let regex = /<option .+>.+<\/option>/g;
      let result = data.match(regex);

      result = result.map(item => {
        //remove tags from result
        item = item.replace(/<[^>]+>/g, '');
        //trim division names
        item = item.trim();
        //convert utf to string
        item = decodeHtmlEntities(item);
        //capitalize names
        item = capitalizeText(item);
        return item;
      }
      )

      //sort division names alphabetically
      let resultSorted = sortArray(result);

      return resultSorted;


    })
}