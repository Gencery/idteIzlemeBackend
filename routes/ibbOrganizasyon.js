import express from "express";

const router = express.Router();
//READ ALL SECTORS (OR add a condition)
router.get("/ibbOrganizasyon", async (req, res) => {

	fetch("https://www.izmir.bel.tr/tr/Birimler/289")
		.then(res => res.text())
		.then(data => {

			let regex = /<span class="(adsoyad|baslik)">.+<\/span>/g;
			let result = data.match(regex);

			function trimBirim(nodeStr) {
				return nodeStr.replace(/<[^>]+>/g, '').trim();
			}

			let organizasyon = [];

			result = result.map(item => {
				if (item.includes("baslik")) {
					organizasyon.push({ baskanlikAdi: trimBirim(item), birimler: [] });
				}
				else if (item.includes("adsoyad")) {
					let currentIndex = organizasyon.length - 1;
					organizasyon[currentIndex].birimler.push(trimBirim(item));
				}
				else {
					console.error("Baskanlık veya birim değil!");
				}
			})

			res.json({
				result: organizasyon.slice(2)
			})
		})
})
export default router;
