import express from "express";
import cors from "cors";
import bodyParser from "express";
//import cron from "node-cron";
import sektorler from "./routes/sektorler.js";
import altSektorler from "./routes/altSektorler.js";
import ibbOrganizasyon from "./routes/ibbOrganizasyon.js"
import ibbSirketler from "./routes/ibbSirketler.js"
import eylemler from "./routes/eylemler.js"
import test from "./routes/test.js"
//
//import db from "./conn.js";
//
const app = express();
app.use(bodyParser.json({ limit: '120kb' }));
const port = 3000;

app.use(cors());

app.use("/", [sektorler, altSektorler, ibbOrganizasyon, ibbSirketler, eylemler, test]);

app.get("/", (req, res) => {
	res.status(200).json({
		msg: "İklim Değişikliği ve Temiz Enerji Şube Müdürlüğü SECAP İzleme Projesi",
	});
});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// //keep server alive by pinging it every 14 minutes
// cron.schedule('*/14 * * * *', ()=>{
// 	fetch("https://idteizlemebackend.onrender.com/").then(res => res.json()).then(data => console.log(data.msg));
// })