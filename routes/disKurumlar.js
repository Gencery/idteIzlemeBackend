import express from "express";
import { getDisKurumlar } from "../logic/disKurumlar.js";

const router = express.Router();
//READ ALL SECTORS (OR add a condition)
router.get("/disKurumlar", async (req, res) => {

	let result = await getDisKurumlar();

	res.json(
		{
			result: result
		}
	)
})
export default router;
