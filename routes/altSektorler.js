import mongodb from "mongodb";
import express from "express";
import db from "../conn.js";

const router = express.Router();
//READ ALL SUBSECTORS
router.get("/altSektorler/list/:sektorId", async (req, res) => {

   let sektorId = req.params.sektorId;
   let result = db
      .collection("altSektorler")

   if (sektorId == "all") {
      result = await result.aggregate(
         [
            { $sort: { name: 1 } },
         ],
         { collation: { locale: "tr" } }
      )
         .toArray();
   }
   else {
      result = await result.aggregate(
         [
            { $sort: { name: 1 } },
            { $match: { sektorId: sektorId } },
         ],
         { collation: { locale: "tr" } }
      )
         .toArray();
   }

   res.json({
      count: result.length,
      result: result,
   });
});



//ADD A SUBSECTOR
router.post("/altSektorler/add/", async (req, res) => {

   let altSektor = post.body;

   const result = await db
      .collection("altSektorler")
      .insertOne({
         name: {
            tr: altSektor.name_tr,
            en: altSektor.name_en
         },
         sektorId: altSektor.sektorId
      })
   res.json(result);
});

//DELETE A SUBSECTOR
router.get("/altSektorler/delete/:id", async (req, res) => {
   const result = await db
      .collection("altSektorler")
      .deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
   res.json(result);
});

//UPDATE A SUBSECTOR
router.post("/altSektorler/update/", async (req, res) => {

   let altSektor = req.body;

   const result = await db
      .collection("altSektorler")
      .replaceOne(
         { _id: new mongodb.ObjectId(altSektor.id) },
         {
            name: {
               tr: altSektor.name_tr,
               en: altSektor.name_en
            },
            sektorId: altSektor.sektorId
         }
      );

   res.json(result);
});

export default router;