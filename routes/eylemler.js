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

//ADD AN EYLEM
router.post("/eylemler/add/", async (req, res) => {
	const result = await db
		.collection("eylemler")
		.insertOne(req.body);
	res.json({"msg":result, added: req.body});
});

//DELETE EYLEM
router.get("/eylemler/delete/:id", async (req, res) => {
	const result = await db
		.collection("eylemler")
		.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
	res.json(result);
});

//UPDATE EYLEM
router.put("/eylemler/update/", async (req, res) => {

	let id = req.body._id;
	let body = req.body;
	delete body._id;
	//
	const result = await db
		.collection("eylemler")
		.replaceOne(
			{ _id: new mongodb.ObjectId(id) },
			{ ...body }
		);

		res.json({"msg":result, added: req.body});
});

export default router;