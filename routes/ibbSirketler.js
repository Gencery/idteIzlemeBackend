import express from "express";
import { fromHtmlEntities, sortArray } from "../utils.js"

const router = express.Router();
//READ ALL SECTORS (OR add a condition)
router.get("/ibbSirketler", async (req, res) => {

	fetch("https://www.izmir.bel.tr/tr/Sirketler/169")
		.then(res => res.text())
		.then(data => {
			let regex = /<h4 style="color:#5d574d">.+<\/h4>/g;
			let result = data.match(regex);
			//
			function trimSirket(nodeStr) {
				return fromHtmlEntities(nodeStr.replace(/<[^>]+>/g, '').trim());
			}

			let sirketler = [];

			result = result.map(item => {
				sirketler.push(trimSirket(item))
			})

			sortArray(sirketler);

			res.json({
				result: sirketler
			})

		})
})
export default router;
