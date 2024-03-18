import mongodb from "mongodb";
import express from "express";
import db from "./../conn.js";

const router = express.Router();
//READ ALL EYLEMLER
router.get("/eylemler/list/all", async (req, res) => {
	const result = await db
		.collection("eylemler")
		.aggregate([{ $sort: { kodu: 1 } }], { collation: { locale: "tr" } })
		.toArray();

	res.json({
		count: result.length,
		result: result,
	});
});

//READ SECTORS STARTS WITH (* girince hata veriyor)
// router.get("/sektorler/startsWith/:startsWith", async (req, res) => {
// 	const startsWith = new RegExp(req.params.startsWith, "gi");
// 	const result = await db
// 		.collection("sektorler")
// 		.find({ name: { $regex: startsWith } })
// 		.sort({ name: 1 }, { collation: { locale: "tr" } })
// 		.toArray();

// 	res.status(200).json({
// 		msg: "",
// 		data: result,
// 	});
// });

//ADD AN EYLEM
router.post("/eylemler/add/", async (req, res) => {
	const result = await db
		.collection("eylemler")
		.insertOne(req.body);
	//res.json({"msg":result, added: req.body});
});

//DELETE EYLEM
router.get("/eylemler/delete/:id", async (req, res) => {
	const result = await db
		.collection("eylemler")
		.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
	res.json(result);
});

//UPDATE A SECTOR
router.get("/sektorler/update/:id/:name/", async (req, res) => {
	const result = await db
		.collection("sektorler")
		.replaceOne(
			{ _id: new mongodb.ObjectId(req.params.id) },
			{ name: req.params.name }
		);

	res.json(result);
});



export default router;