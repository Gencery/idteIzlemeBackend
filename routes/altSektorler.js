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
   let isSektorPresent = altSektorlerRead(sektorId).length;

   let result = null;

   //altsektör eklenecek sektör varsa
   if (isSektorPresent) {
      const resultOfInsert = await db
         .collection("altSektorler")
         .insertOne({
            name: {
               tr: altSektor.name_tr,
               en: altSektor.name_en
            },
            sektorId: sektorId
         })
      //returns {"acknowledged":true,"insertedId":"66cef6cd8009b56384fd5e94"} if successful

      //alt sektör ekleme başarılı olduysa
      if (resultOfInsert.acknowledged) {
         result = {
            msg: `Yeni alt sektör ${""} eklendi!`, code: 201
         }
      }
      else {
         result = { msg: "Yeni alt sektör ekleme işlemi başarısız oldu!", code: 501 }
      }
   }
   else {
      result = { msg: "Yeni alt sektör eklemek istediğiniz sektör bulunamadı!", code: 404 }
   }


   res.json({ ...result, added: result.code == 201 ? req.body : null });

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