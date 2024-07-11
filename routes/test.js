import express from "express";
import db from "./../conn.js";

const router = express.Router();
//READ ALL SECTORS (OR add a condition)
router.get("/test/", async (req, res) => {

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