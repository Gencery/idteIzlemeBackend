import express from "express";
import getIbbOrg from "./../logic/ibbOrganizasyon.js"
const router = express.Router();


//READ ALL SECTORS (OR add a condition)
router.get("/ibbOrganizasyon", async (req, res) => {

	let organizasyon = await getIbbOrg();

	res.json({
		result: organizasyon
	})
})
export default router;
