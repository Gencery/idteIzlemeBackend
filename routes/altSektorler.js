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
router.get("/altSektorler/add/:sektorId/:name", async (req, res) => {
   const result = await db
      .collection("altSektorler")
      .insertOne({ name: req.params.name, sektorId: req.params.sektorId });
   res.json(result);
});

//DELETE A SUBSECTOR
router.get("/altSektorler/delete/:id", async (req, res) => {
   const result = await db
      .collection("altSektorler")
      .deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
   res.json(result);
});

// //UPDATE A SUBSECTOR
router.get("/altSektorler/update/:id/:sektorId/:name", async (req, res) => {
   const result = await db
      .collection("sektorler")
      .replaceOne(
         { _id: new mongodb.ObjectId(req.params.id) },
         { name: req.params.name, sektorId: req.params.sektorId }
      );

   res.json(result);
});

export default router;