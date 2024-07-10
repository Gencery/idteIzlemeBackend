import db from "../conn.js";

export async function altSektorlerRead(sektorId) {

  let result = db
    .collection("altSektorler");

  if (sektorId == "all") {
    result = await result.aggregate(
      [
        { $sort: { "name.tr": 1 } },
      ],
      { collation: { locale: "tr" } }
    )
      .toArray();
  }
  else {
    result = await result.aggregate(
      [
        { $sort: { "name.tr": 1 } },
        { $match: { sektorId: sektorId } },
      ],
      { collation: { locale: "tr" } }
    )
      .toArray();
  }
  return result;
}