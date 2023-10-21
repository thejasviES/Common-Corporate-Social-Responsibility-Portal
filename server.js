const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 8080



const DB = process.env.DATA_BASE1;
//console.log(DB);
try {
    mongoose.connect(DB).then(() => { console.log("database connected") })
} catch (err) {
    console.log(err);
}

const server = app.listen(port, () => {
    console.log("server runnig on port 8080");
})