import { MongoClient } from "mongodb";
import express from "express";
const app = express();
const port = 3000;

const connectionString =
	"mongodb+srv://genceryigiter:n01oct4u@cluster0.if01aqt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);

app.get("/", async (req, res) => {
	await client.connect();
	const result = await client
		.db("sample_gencer")
		.collection("bestFriends")
		.find({ age: { $gte: 30 } })
		.toArray();
	res.json(result);
	client.close();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
