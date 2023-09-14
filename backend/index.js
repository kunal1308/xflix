const mongoose = require("mongoose");
const config = require("./config/config")
const app = require("./app");

let server;
const port = config.port;

mongoose
.connect(config.mongoose.url)
.then(()=> {
    console.log("Connected to database");
    server = app.listen(port, () => {
        console.log(
            `Server listening on port ${port}`
        );
    })
})
.catch((err) => console.log(err));