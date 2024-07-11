import mongodb from "mongodb";
import express from "express";
import db from "./../conn.js";
import { sektorlerWithAltSektorler } from "../logic/misc.js";
import { getIbbSirketler } from "../logic/ibbSirketler.js";
import { getIbbOrg } from "../logic/ibbOrganizasyon.js";

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
	res.json({ "msg": result, added: req.body });
});

//DELETE EYLEM
router.get("/eylemler/delete/:id", async (req, res) => {
	const result = await db
		.collection("eylemler")
		.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
	res.json(result);
});

//UPDATE EYLEM
router.put("/eylemler/update/:id", async (req, res) => {

	let id = req.params.id;
	let body = req.body;
	//
	const result = await db
		.collection("eylemler")
		.replaceOne(
			{ _id: new mongodb.ObjectId(id) },
			{ ...body }
		);

	res.json({ "msg": result, added: req.body });
});

//EYLEMLER FORM DATA
router.get("/eylemlerFormData/", async (req, res) => {

	let sektorlerAltsektorleriyle = await sektorlerWithAltSektorler();
	let ibbSirketler = await getIbbSirketler();
	let ibbOrganizasyon = await getIbbOrg();

	res.json({
		sektorlerAltsektorleriyle: sektorlerAltsektorleriyle,
		ibbSirketler: ibbSirketler,
		ibbOrganizasyon: ibbOrganizasyon
	});
});

export default router;