const express = require('express')
const app = express()
cors = require('cors')

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000


// middelware
app.use(cors());
app.use(express.json())
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@cluster0.azomj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const Collection = client.db("wowmart").collection("products");
    const iconCollection = client.db("wowmart").collection("productIcon");
    app.get('/product/:id', async (req, res) => {
      const id = req.params.id
      const datas = []
      const query = { _id: ObjectId(id) }
      const cursor = await Collection.findOne(query);
      const product = [...datas, cursor]
      res.send(product)
    })


    app.get('/icon', async (req, res) => {

      const query = {}
      const cursor = await iconCollection.find(query).toArray()
      res.send(cursor)
    })
    app.get('/products', async (req, res) => {

      const query = {}

      const cursor = await Collection.find(query).toArray()
      res.send(cursor)
    })


  } finally {

  }

}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('wow server')
})

app.listen(port, () => {
  console.log(` listening on port ${port}`)
})