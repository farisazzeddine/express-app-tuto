const mongoose = require('mongoose');

async function connectionToDB() {
    try {
        await mongoose.set('strictQuery', true);
        mongoose.connect(process.env.MONGO_URI)
        console.log('connected to db')
    }
    catch(e){
         console.log('connected field to db',e)
    }
}
module.exports = connectionToDB;
// mongoose.set('strictQuery', true);
// mongoose.connect(process.env.MONGO_URI)
//     .then(()=>console.log('connected to db'))
//     .catch((e)=>console.log('connected field to db',e))