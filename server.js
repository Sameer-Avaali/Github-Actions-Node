const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 3000;  // match docker
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:qwerty@mongo:27017";
const client = new MongoClient(MONGO_URL);

app.get("/getUsers", async (req, res) => {
    await client.connect();
    const db = client.db("apnacollege-db");
    const data = await db.collection('users').find({}).toArray();
    await client.close();
    res.send(data);
});

app.post("/addUser", async (req, res) => {
    const userObj = req.body;
    await client.connect();
    const db = client.db("apnacollege-db");
    await db.collection('users').insertOne(userObj);
    await client.close();
    res.send("User Added");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});