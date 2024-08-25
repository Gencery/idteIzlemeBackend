import { fromHtmlEntities, sortArray, removeTrimTags } from "../utils.js"

export async function getIbbSirketler() {
  return fetch("https://web.archive.org/web/https://www.izmir.bel.tr/tr/Sirketler/169")
    .then(res => res.text())
    .then(data => {
      let regex = /<h4 style="color:#5d574d">.+<\/h4>/g;
      let result = data.match(regex);
      //
      function trimSirket(nodeStr) {
        return fromHtmlEntities(nodeStr.replace(/<[^>]+>/g, '').trim());
      }

      let sirketler = [];

      result = result.map(item => {
        sirketler.push(removeTrimTags(item))
      })

      sirketler = sortArray(sirketler);
      //http://web.archive.org/web/20240414143646/https://www.izmir.bel.tr/tr/IzmirKamuKurumlari/51/276
      return sirketler;

    })
} 