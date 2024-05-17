import mongodb from "mongodb";
import express from "express";
import db from "./../conn.js";

const router = express.Router();
//READ ALL SECTORS (OR add a condition)
router.get("/sektorler/list", async (req, res) => {
	const result = await db
		.collection("sektorler")
		.aggregate([{ $sort: { name: 1 } }], { collation: { locale: "tr" } })
		.toArray();
	//.find({ age: { $gte: 25 } })
	//.toArray();

	res.json({
		count: result.length,
		result: result,
	});
});

//READ SECTORS STARTS WITH (* girince hata veriyor)
router.get("/sektorler/startsWith/:startsWith", async (req, res) => {
	const startsWith = new RegExp(req.params.startsWith, "gi");
	const result = await db
		.collection("sektorler")
		.find({ name: { $regex: startsWith } })
		.sort({ name: 1 }, { collation: { locale: "tr" } })
		.toArray();

	res.status(200).json({
		msg: "",
		data: result,
	});
});

//ADD A SECTOR
router.post("/sektorler/add/", async (req, res) => {

	let sektor = req.body;

	const result = await db
		.collection("sektorler")
		.insertOne({ name: { tr: sektor.name_tr, en: sektor.name_en } });
	res.json({ "msg": result, added: req.body });
});

//DELETE A SECTOR
router.get("/sektorler/delete/:id", async (req, res) => {
	const result = await db
		.collection("sektorler")
		.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
	res.json(result);
});

//UPDATE A SECTOR
router.post("/sektorler/update/:id/", async (req, res) => {
	const result = await db
		.collection("sektorler")
		.replaceOne(
			{ _id: new mongodb.ObjectId(req.params.id) },
			{
				name: {
					tr: req.body.name_tr,
					en: req.body.name_en
				}
			}
		);

	res.json({ "msg": result, added: req.body });
});

export default router;