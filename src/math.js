// console.log('Starting');

// setTimeout(()=>{
//     console.log('run after 1 sec')
// }, 1000)

// setTimeout(()=>{
//     console.log('run after 0 sec')
// }, 0)

// console.log('Stopping');

const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(a<0 || b< 0){
                return reject ('Number must be non-negative')
            }
            resolve(a+b);
        }, 2000)
    })
}

module.exports = {add}