require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ddy6nyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();




    const userPlantCollection = client.db('userDB').collection('AllPlant');
    app.get('/addplant', async (req, res) =>{
        const cursor = userPlantCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/myplants/:id', async (req, res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await userPlantCollection.findOne(query);
        res.send(result);
    })
    
    app.post('/addplant', async (req, res) =>{
        const newPlant = req.body;
        const userResult = await userPlantCollection.insertOne(newPlant);
        res.send(userResult);
    })

    app.put('/myplants/:id', async(req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };
        const updatedPlant = req.body;
        const updateDocs = {
            $set: updatedPlant
        };
        const result = await userPlantCollection.updateOne(filter, updateDocs, option);
        res.send(result);
    });

    app.delete('/myplants/:id', async (req, res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await userPlantCollection.deleteOne(query);
        res.send(result);
    })












    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
  } finally {
    
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send("Home Page!!");
})

app.listen(port)