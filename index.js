const express = require("express");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 3000;
app.use(express.json());


const connectionString = 'https://gunjanproductapp.azurewebsites.net'

    
    app.get("/", async (req, res) => {
        try {
            res.sendFile(__dirname + "/index.html");
        
        } catch (error) {
            res.status(500).send("Server Error");
        }
    });

//Get all the products
app.get("/products", async (req,res) =>{
    try{ 
        let response= await axios.get(connectionString + `/products`);
        res.send(response.data);
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    });

// Get product by a specific ID
    app.get("/product/:id", async (req, res) =>{
        try{
            const id = parseInt(req.params.id);
            let response = await axios.get(connectionString + `/product/${id}`);
            res.json(response.data);
        }catch(error)
        {
            if (error.response && error.response.status === 404) {
                res.status(404).send("Product not Found");
            } else {
                res.status(500).send("Internal Server Error");
            }

        }
    });

    //Create a product
    app.post("/product", async (req,res) =>{
        try{
            let response = await axios.post(connectionString + `/product`,{
            name: req.body.name,
            type: req.body.type
            });
            res.json("Product has been added successfully")
        }
        catch(error){
            res.status(500).send("Internal Server Error");
        }
    });


    //Update a product
    app.put("/product/:id", async (req, res) =>{
        try{
            let id = parseInt(req.params.id);
            let updateProduct = req.body;
            let response = await axios.put(connectionString + `/product/${id}`, updateProduct);
            res.json("Product has been updated successfully");
        }
        catch(error)
        {
            if (error.response && error.response.status === 404) {
                res.status(404).send("Product not Found");
            } else {
                res.status(500).send("Internal Server Error");
            }

        }
    });

    
 //Delete a product
    app.delete("/product/:id", async (req, res) =>{
        try{
            let id = parseInt(req.params.id);
            let response = await axios.delete(connectionString + `/product/${id}`);
            res.json("Product has been deleted successfully");
        }
        catch(error)
        {
            if (error.response && error.response.status === 404) {
                res.status(404).send("Product not Found");
            } else {
                res.status(500).send("Internal Server Error");
            }

        }
    });

app.listen(PORT, async()=>{
    console.log("Listening to PORT: " + PORT);
});
