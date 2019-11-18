const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 3000



// app.use((req, res, next) => {
//     //next : is specific to registering middleware
//     console.log(req.method, req.path)
//     if(req.method ==='POST' || 'PATCH' || 'DELETE') {
//         res.send({error: 'You are not authorized to request POST | PATCH api call.' })
//         // throw new Error('You are not authorized to request!')
//     }
//     next()
// })


// app.use((req, res, next) => {
    
//     if(req.method) {
//         res.status(503).send({error: 'Site is under maintainance!' })
//     }
//     next()

// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port: ', port)
})

// const Task = require('./models/task')
// const User = require('./models/user')
//const main = async () => {

//     try {

//         const user = await User.findById('5dd312e3d738aa3f4493e672')
//         console.log(user.tasks)
//         await user.populate('tasks').execPopulate()
//             console.log(user.tasks)

//         // const task = await Task.findById('5dd30c64c9bbba044811ec97')
//         // await task.populate('owner').execPopulate()
//         // console.log(task.owner)

//     } catch(e) {
//         console.log(e)
//     }
// }

// main()