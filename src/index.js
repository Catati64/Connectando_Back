const express = require('express');
const cors = require("cors");
const router = require('./routes/routes')

const app = express()

app.use(cors());
app.use(express.json())

app.use('/', router)



const PORT = process.env.PORT || 3010
app.listen(PORT, () => {
    console.log('Listen Port:', PORT)
})