import express from "express";
import { getIbbSirketler } from "../logic/ibbSirketler.js";

const router = express.Router();
//READ ALL SECTORS (OR add a condition)
router.get("/ibbSirketler", async (req, res) => {

	let result = await getIbbSirketler();

	res.json(
		{
			result: result
		}
	)
})
export default router;
