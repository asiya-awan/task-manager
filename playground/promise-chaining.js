require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

// User.findByIdAndUpdate(id, {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result)=> {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {

    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({ age })
    return count

}

updateAgeAndCount('5dcdc58d0f80214678bcffce', 22).then((count) => {
    console.log('count: ',count)
}).catch((e) => {
    console.log(e)
})





// Task.findByIdAndDelete('5dcdc58d0f80214678bcffce').then((task) => {
   
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((tasks) => {
//     console.log(tasks)
    
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const countUncompletedTasks = await Task.countDocuments({completed: false})

    return countUncompletedTasks
}

deleteTaskAndCount('5dcdcf918e4d5b0b90b0627f').then((countUncompletedTasks) => {
    console.log(countUncompletedTasks)
}).catch((e) => {
    console.log(e)
})



// The findByIdAndUpdate bypasses the .pre('save') middleware because it's not a save operation, it's an update therefore 
//if we try to update the password, it's not going to be hashed since our middleware isn't being triggered.

