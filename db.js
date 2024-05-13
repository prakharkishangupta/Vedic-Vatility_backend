const mongoose = require("mongoose");

const mongoURI = 'mongodb://localhost:27017/ContextAPI';
const connectToMongo = async () => {
   try{
    mongoose.connect(mongoURI);
    console.log('Mongodb connected successfully.');
   }catch(error){
    console.log(error);
   }

}
module.exports = connectToMongo;