
require('dotenv').config() // PARA IMPORTAR VARIABLES DE ENTORNO 
require('./connection')
const express = require('express')
const app = express()
const cors = require('cors')
const routePost = require('./src/routes/postRoute')




app.use(cors())

//app.use('/image_upload',express.static('image_upload'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('key', process.env.KEY);
app.use('/post',routePost)


app.listen(process.env.PORT, () => {
console.log(`Server running on port ${process.env.PORT}`)
})
