import express from "express";
import cors from "cors";
import sektorler from "./routes/sektorler.js";
import altSektorler from "./routes/altSektorler.js";
import ibbOrganizasyon from "./routes/ibbOrganizasyon.js"
//
//import db from "./conn.js";
//
const app = express();
const port = 3000;

app.use(cors());

app.use("/", [sektorler, altSektorler, ibbOrganizasyon]);

app.get("/", (req, res) => {
	res.status(200).json({
		msg: "İklim Değişikliği ve Temiz Enerji Şube Müdürlüğü SECAP İzleme Projesi",
	});
});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
