const express = require('express');
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const routers = require("./routers/v1/routes");
app.use("/api/1", routers)


const port = 8080
app.listen(port, () => {
    console.log('Listening on port ' + port)
})