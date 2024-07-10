import { sektorlerRead } from "./sektorler.js";
import { altSektorlerRead } from "./altSektorler.js";
import { getIbbOrg } from "./../logic/ibbOrganizasyon.js"
import { getIbbSirketler } from "./ibbSirketler.js";

export async function sektorlerWithAltSektorler() {
  let sektorler = await sektorlerRead();
  let altSektorler = await altSektorlerRead("all");

  sektorler.forEach(sektor => {
    altSektorler.forEach(altSektor => {
      if (altSektor.sektorId == sektor._id) {
        if (!sektor.altSektorler) {
          sektor.altSektorler = [];
        }
        sektor.altSektorler.push(altSektor);
      }
    })

  })

  return sektorler;
}

