require("dotenv").config();

const app = require("./app.js");
const pool = require("./config/db.js");

const PORT = process.env.PORT || 5000;

pool.connect().then(() =>{
    console.log("connected to database");
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`)
    });
    
}).catch((error) =>{
    console.error(`Database Connection Failed: ${error}`)
})

