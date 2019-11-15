const add = (a,b ) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b)
        
        },2000)

    })
}


// add(1,2).then((sum) => {
//     console.log(sum)
//     add(sum,5).then((sum) => {
//         console.log(sum)    
//     }).catch((e) => {
//         console.log(e)
//     })

// }).catch((e) => {
//     console.log(e)
// })


// better to use promises to achieve same thing


add(1, 1).then((sum) => {
    console.log(sum)
    return add(sum, 1)

}).then((sum2)=>{
    console.log(sum2)
    return add(sum2, 1)
}).then((sum3)=>{
    console.log(sum3)
    return add(sum3, 1)
}).catch((e) => {
    console.log(e)
})