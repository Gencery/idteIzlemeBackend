export function fromHtmlEntities(string) {
   return (string + "").replace(/&#\d+;/gm, function (s) {
      return String.fromCharCode(s.match(/\d+/gm)[0]);
   })
}
//sort array
export function sortArray(arr, prop) {
   if (prop) {
      arr.sort((a, b) => a[prop].toLocaleLowerCase("TR").localeCompare(b[prop].toLocaleLowerCase("TR")));
   }
   else {
      arr.sort((a, b) => a.toLocaleLowerCase("TR").localeCompare(b.toLocaleLowerCase("TR")));
   }
}