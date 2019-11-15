const express = require('express');
require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// app.post('/users', (req, res) => {
//     const user = new User(req.body)

//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((e) => {
    
//         res.status(400).send(e)
//         // res.send(err)
//         //res.status(401).send(err.message)
//     })
   
// })
app.post('/users', async (req, res) => {
    try {

        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }
   
})

app.post('/tasks', (req,res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })

})


app.get('/users', (req,res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


// app.get('/users/:id', (req,res) => {
//     //console.log(req.params.id)
//     User.find({_id: req.params.id}).then((user) => {
//         res.send(user)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })

app.get('/users/:id', (req,res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {

        // if (!mongoose.Types.ObjectId.isValid(req.params.id)){
        //     return res.status(400).send({error: 'Invalid ID!'})
        //   }
        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    }).catch((e) => {
        res.status(500).send(e)
    })
})


//TASK

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/tasks/:id', (req, res) => {

    const _id = req.params.id

    Task.findById(_id).then((task) => {
      
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.listen(port, () => {
    console.log('Server is up on port: ',port)
})
