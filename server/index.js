const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT


//import schema
const Record = require('./models/Record')





//connect to DB
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    console.log('MongoDB connection: ' + conn.connection.host)
}

connectDB()





const app = express()
app.use(express.json())



// GET
app.get('/api/v1/records', async (req, res) => {
    try {
        const records = await Record.find()
        return res.status(200).json({
            success: true,
            count: records.length,
            data: records
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'server error'
        })
    }
})



// POST
app.post('/api/v1/records', async (req, res) => {
    try {
        const text = req.body.text;
        const tagsInput = req.body.tags.split(' ')
        const tagsInput2 = tagsInput.filter(tag => tag !== '')
        const tagsInput3 = tagsInput2.map(tag => tag.replace(',', ''))
        
        
        const record = await Record.create({text: text, tags: tagsInput3})
        return res.status(201).json({
            success: true,
            data: record
        })
    } catch (err) {
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(function(val){
                return val.message
            })
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'server error'
            })
        }
    }
})









// PUT
app.put('/api/v1/records/:id', async (req, res) => {
    try {
        const {text, tags, lastUpdatedAt} = req.body
        const record = await Record.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})

        return res.status(201).json({
            success: true,
            data: record
        })

    } catch (err) {
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map( (val) => val.message)

            return res.status(404).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'server error'
            })
        }
        
        
    }
})







// DELETE
app.delete('/api/v1/records/:id', async (req, res) => {
    try {
        const record = await Record.findById(req.params.id)

        if(!record){
            return res.status(404).json({
                success: false,
                error: 'record not found'
            })
        }

        await record.remove()
        return res.status(200).json({
            success: true,
            data: {}
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'server error'
        })
    }
})




app.listen(PORT, () => console.log(`server running on port ${PORT}`) )