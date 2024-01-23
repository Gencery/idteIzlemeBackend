import express from "express";
import cors from "cors";
import sektorler from "./routes/sektorler.js";
//
import db from "./conn.js";
//
const app = express();
const port = 3000;

app.use(cors());

app.use("/", sektorler);

app.get("/", (req, res) => {
	res.status(200).json({
		msg: "İklim Değişikliği ve Temiz Enerji Şube Müdürlüğü SECAP İzleme Projesi",
	});
});

app.get("/test/:startsWith", async (req, res) => {
	const startsWith = new RegExp(req.params.startsWith, "gi");
	const result = await db
		.collection("sektorler")
		.find({ name: { $regex: startsWith } })
		.sort({ name: 1 }, { collation: { locale: "tr" } })
		.toArray();

	res.status(200).json({
		msg: "",
		data: result,
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
