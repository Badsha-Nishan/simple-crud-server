const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri =
//   "mongodb+srv://simpleCrudUser:MvA1DTjygfzKmJSW@cluster0.ybukze0.mongodb.net/?appName=Cluster0";
const uri =
  "mongodb://simpleCrudUser:MvA1DTjygfzKmJSW@ac-jzykyr7-shard-00-00.ybukze0.mongodb.net:27017,ac-jzykyr7-shard-00-01.ybukze0.mongodb.net:27017,ac-jzykyr7-shard-00-02.ybukze0.mongodb.net:27017/?ssl=true&replicaSet=atlas-13ipv9-shard-0&authSource=admin&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("simpleCrud");
    const userCollection = db.collection("users");
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const user = await userCollection.findOne(query);
      console.log(id);
      res.send(user);
    });

    app.post("/users", async(req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser)
      console.log("user to be inserted", newUser);
      res.send(result)
    })

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("simple CRUD server is serving");
});

app.listen(port, () => {
  console.log(`simple CRUD server is running on port ${port}`);
});
