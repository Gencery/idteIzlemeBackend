import db from "./../conn.js";

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
