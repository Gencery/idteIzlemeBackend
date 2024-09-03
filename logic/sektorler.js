import db from "./../conn.js";
import { altSektorlerRead } from "./altSektorler.js";

export async function sektorlerRead() {
  const result = await db
    .collection("sektorler")
    .aggregate(
      [{ $sort: { "name.tr": 1 } }],
      { collation: { locale: "tr" } }
    )
    .toArray();

  return result;
}

export async function sektorlerWithAltSektorler() {
  let sektorler = await sektorlerRead();
  let altSektorler = await altSektorlerRead("all");

  sektorler.forEach(sektor => {
    sektor.altSektorler = [];
    altSektorler.forEach(altSektor => {
      if (altSektor.sektorId == sektor._id) {
        //if (!sektor.altSektorler) {
        //}
        sektor.altSektorler.push(altSektor);
      }
    })

  })

  return {
    result: sektorler, 
    count: {sektorler: sektorler.length, altSektorler: altSektorler.length}
  };
}