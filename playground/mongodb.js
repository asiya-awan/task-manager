const {MongoClient, ObjectID} = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error){
      return  console.log('Unalbe to connect to database!')
    } 

    console.log('Connected correctly!')
    const db = client.db(databaseName)

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5dcc43fc8c0b217b748c3742")
    // }, {
    //     $set: {
    //         name: "Qurat-ul-Ain"
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').updateMany(
    //     {age: 23, position: 'QA'}, 
    //     {
    //         $set: { postion: 'Senior QA'}
    //     }).then((result)=> {
    //         console.log(result.modifiedCount)

    //     }).catch((error) => {
    //         console.log(error)
    //     })
   
    db.collection('users').deleteOne({_id: new ObjectID("5dcc3ff48cd48c57a4c9fcc1")}).then((result) => {
        console.log("Deleted: ",result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })


    // const me = new User({name: 'Rania', position: 'Designer', age: 'mike'})
const me = new User({ position:'resting', age: 31, phone: "122-132-1234", password: "Pass"})


me.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(`${error.name}: ${error.message}`)
})


// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }

// })

// const task1 = new Task({description: 'Cleaning the hours', completed: true})

// task1.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(`${error.name}: ${error.message}`)
// })
    db.collection('users').deleteMany({age: 23}).then((result) => {
        console.log("Deleted: ", result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })


})

