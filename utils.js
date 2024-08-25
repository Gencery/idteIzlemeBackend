export function fromHtmlEntities(string) {
   return (string + "").replace(/&#\d+;/gm, function (s) {
      return String.fromCharCode(s.match(/\d+/gm)[0]);
   })
}
//sort array
export function sortArray(arr, prop) {

   let newArr = arr.slice();

   if (prop) {
      newArr.sort((a, b) => a[prop].toLocaleLowerCase("TR").localeCompare(b[prop].toLocaleLowerCase("TR")));
   }
   else {
      newArr.sort((a, b) => a.toLocaleLowerCase("TR").localeCompare(b.toLocaleLowerCase("TR")));
   }

   return newArr;
}

export function decodeHtmlEntities(str) {
   return str.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
   });
}

export function capitalizeText(str) {
   return str.toLocaleLowerCase("tr-TR").split(" ").map(word => {
      if (!word) {
         return;
      }
      else if (word == "ve") {
         return word;
      }
      else
         return word[0].toLocaleUpperCase("tr-TR") + word.slice(1);
   }).join(" ");

}