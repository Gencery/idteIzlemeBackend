import express from "express";
import db from "./../conn.js";
import { sektorlerWithAltSektorler } from "../logic/misc.js";

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

router.get("/everything", async (req, res) => {
	let result = await sektorlerWithAltSektorler();

	res.json(
		result
	)
})



export default router;