// cRUD create reaad update delte

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const objectID = mongodb.objectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
// console.log(id)
// console.log("id.Timestamp", id.getTimestamp())
// console.log("id.HexString", id.toHexString())

// console.log("id.id.length", id.id.length)
// console.log("id.HexString.length", id.toHexString().length)

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error){
      return  console.log('Unalbe to connect to database!')
    } 

    console.log('Connected correctly!')
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Kainat',
    //     position: 'QA'
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user!', error.message)
    //     }

    //     console.log(result.ops);

    // })

    // db.collection('users').insertMany(
    //     [
    //         {
    //             name: 'Monika',
    //             position: 'QA'
    //         },
    //         {
    //             name: 'Shams',
    //             age: 'Actor'
    //         },
    //         {
    //             name: 'Qurat',
    //             age: 'Singer'
    //     }], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert users!', error.message)
    //     }

    //     console.log(result.ops);

    // });

    
    // db.collection('tasks').insertMany(
    //     [
    //         {
    //             description: 'Clean the house',
    //             completed: true
    //         },
    //         {
    //             description: 'Renew inspection',
    //             completed: false
    //         },
    //         {
    //             description: 'Water plants',
    //             completed: false
    //     }], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert tasks!', error.message)
    //     }

    //     console.log(result.ops);

    // });

    db.collection('users').find({position: 'QA'}).forEach(doc,(error,doc) => {
        if(doc.name=='Asia')
         console.log("forEach: ",doc)
    })

    db.collection('users').find({position: 'QA'}).toArray((error,users) => {
        console.log(users)
    })

    // db.collection('users').findOne({_id: new ObjectID("5dcc7460a0e4df76689ff372")}, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch', error.message)
    //     }
    //     console.log("Found: ",user)
    // })

    
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
   
})