const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // if(resolve) {

        // }
        resolve([4,2,12])
        reject('There is error')
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log('Success!', result)
}).catch((error) => {
    console.log(error)
})