import mongodb from "mongodb";
import express from "express";
import db from "../conn.js";
import { altSektorlerRead } from "../logic/altSektorler.js";

const router = express.Router();
//READ ALL SUBSECTORS
router.get("/altSektorler/list/:sektorId", async (req, res) => {

   let sektorId = req.params.sektorId;
   let result = await altSektorlerRead(sektorId);


   res.json({
      count: result.length,
      result: result,
   });
});


//ADD A SUBSECTOR
router.post("/altSektorler/add/:sektorId", async (req, res) => {

   let altSektor = req.body;
   let sektorId = req.params.sektorId;

   const result = await db
      .collection("altSektorler")
      .insertOne({
         name: {
            tr: altSektor.name_tr,
            en: altSektor.name_en
         },
         sektorId: sektorId
      })
   res.json({ "msg": result, added: req.body });
});

//DELETE A SUBSECTOR
router.get("/altSektorler/delete/:id", async (req, res) => {
   const result = await db
      .collection("altSektorler")
      .deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
   res.json(result);
});

//UPDATE A SUBSECTOR
router.patch("/altSektorler/update/:altSektorId", async (req, res) => {

   let altSektor = req.body;

   const result = await db
      .collection("altSektorler")
      .updateOne(
         { _id: new mongodb.ObjectId(req.params.altSektorId) },
         {
            $set: {
               name: {
                  tr: altSektor.name_tr,
                  en: altSektor.name_en
               }
            }

         }
      );

   res.json({ msg: result });
});

export default router;