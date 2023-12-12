const mongoose = require('mongoose')
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODDB_URI)
        console.log(`connecting to database`)
    } catch (error) {
        console.log(`error connecting to database`, error)
    }
}

module.exports = connectToDb