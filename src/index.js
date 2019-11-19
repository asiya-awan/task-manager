const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000  //1MB

    },
    fileFilter(req, file, cb) {

        if(!file.originalname.match(/\.(doc|docx|pdf)$/)){
                return cb(new Error('Please upload word or pdf doc'))  //error 

        }

        // if(!file.originalname.endsWith('pdf'))
        //  {
        //      return cb(new Error('Please upload a PDF'))  //error 

        //  }
         cb(undefined, true)                  // accept
        // cb(undefined, false)  // silently reject upload

    }
})
const errorMiddleware = (req, res, next) => {
    throw new Error('from the middleware')
}
// upload.single('upload')
app.post('/upload', upload.single('upload'), (req,res) => {
    try {

        res.send()
    }catch(e) {
        console.log(e)
        res.send(e)
    }

}, (error, req, res, next) => {
        //console.log(error.stack)
        res.status(400).send({error: error.message})
})


//http://expressjs.com/en/guide/error-handling.html   
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port: ', port)
})

