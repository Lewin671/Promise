const Promise = require("./Promise")

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok');
    }, 3000);
}).then(data => {
    console.log(data, 'success')
    return 1;
}).then(data => console.log("success " + data))
