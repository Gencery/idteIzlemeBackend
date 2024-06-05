import express from "express";

const router = express.Router();
//READ ALL SECTORS (OR add a condition)
router.post("/translate/", async (req, res) => {

	fetch(
		`https://api.mymemory.translated.net/get?user=34854f247e3138f2e2f2&langpair=tr|en&q=${req.body.toBeTranslated}`
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.responseDetails == "QUERY LENGTH LIMIT EXCEEDED. MAX ALLOWED QUERY : 500 CHARS") {
				res.json({
					result: 0
				})
			}
			else {
				res.json(
					{
						"result": data.responseData.translatedText,
					}
				)
			}
		});
})
export default router;
