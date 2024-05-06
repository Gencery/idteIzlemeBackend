import express from "express";

const router = express.Router();
//READ ALL SECTORS (OR add a condition)
router.get("/translate/:text", async (req, res) => {


	fetch(
		`https://api.mymemory.translated.net/get?user=34854f247e3138f2e2f2&langpair=tr|en&q=${req.params.text}`
	)
		.then((res) => res.json())
		.then((data) => {
			res.json({ "result": data.responseData.translatedText, "request": req.params.text });
		});
})
export default router;
