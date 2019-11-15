const doWorkCallback = (callback) => {
    setTimeout(() => {
        //callback('This is my eroror', undefined)
        callback( undefined, [3,2,445])
    })
}

doWorkCallback((error, result) => {
    if(error) {
        return console.log(error)
    }

    console.log(result)

})