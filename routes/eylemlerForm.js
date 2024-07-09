import express from "express";

const router = express.Router();
//READ ALL EYLEMLER
router.get("/eylemlerForm", async (req, res) => {

	fetch("localhost:3000/ibbOrganizasyon")
		.then(res => res.json())
		.then(data => {
			res.json({
				result: data,
			});
		});
});

export default router;