import express from "express";

const router = express.Router();
//READ ALL SECTORS (OR add a condition)
router.get("/ibbOrganizasyon", async (req, res) => {

	fetch("https://www.izmir.bel.tr/tr/Birimler/289")
		.then(res => res.text())
		.then(data => {

			//let regex = /<span class="[baslik|adsoyad]">.+<\/span>/g;
			let regex = /<span class="(adsoyad|baslik)">.+<\/span>/g;
			let result = data.match(regex);
			//
			res.json({
				result: result
			});
		})



});




export default router;