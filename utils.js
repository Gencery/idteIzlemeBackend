export function fromHtmlEntities(string) {
   return (string + "").replace(/&#\d+;/gm, function (s) {
      return String.fromCharCode(s.match(/\d+/gm)[0]);
   })
}