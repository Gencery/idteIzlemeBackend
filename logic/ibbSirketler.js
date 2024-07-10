import { fromHtmlEntities, sortArray } from "../utils.js"

export async function getIbbSirketler() {
  return fetch("https://www.izmir.bel.tr/tr/Sirketler/169")
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
        sirketler.push(trimSirket(item))
      })

      sirketler = sortArray(sirketler);

      return sirketler;

    })
} 