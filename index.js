const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) =>{
    res.send("Home Page");
})

app.listen(port, () =>{
    console.log(`server running at port: ${port}`)
})