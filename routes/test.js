import express from "express";
import db from "./../conn.js";

const router = express.Router();
//READ ALL SECTORS (OR add a condition)
router.get("/test/list", async (req, res) => {
	const resultSektorler = await db
		.collection("sektorler")
		.aggregate([{ $sort: { name: 1 } }], { collation: { locale: "tr" } })
		.toArray();

	const resultAltSektorler = await db
		.collection("altSektorler")
		.aggregate([{ $sort: { name: 1 } }], { collation: { locale: "tr" } })
		.toArray();


	res.json({
		result: [...resultSektorler, ...resultAltSektorler]
	});
});




export default router;