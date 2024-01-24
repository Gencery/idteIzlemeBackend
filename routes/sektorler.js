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

//ADD A SECTOR
router.get("/sektorler/add/:name/", async (req, res) => {
	const result = await db
		.collection("sektorler")
		.insertOne({ name: req.params.name });
	res.json(result);
});

//DELETE ONE SECTOR
router.get("/sektorler/delete/:id", async (req, res) => {
	const result = await db
		.collection("sektorler")
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
