require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const connectToDb = require('./db')
const cors = require('cors')



connectToDb()
app.use(cors())
app.use(express.json())

app.use('/api/v1/user', require('./routers/userRoutes'))
app.use('/api/v1/product', require('./routers/productRoutes'))


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})