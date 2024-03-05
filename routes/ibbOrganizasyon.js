import express from "express";

const router = express.Router();
//READ ALL SECTORS (OR add a condition)
router.get("/ibbOrganizasyon", async (req, res) => {

	fetch("https://www.izmir.bel.tr/tr/Birimler/289")
		.then(res => res.text())
		.then(data => {
			res.json({
				data
			});
		})



});




export default router;