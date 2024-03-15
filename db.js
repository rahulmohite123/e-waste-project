const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/ewc";

const connectToMongo = async ()=>{
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    //   useCreateIndex: true
    });
    console.log("connected to mongo successfully");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectToMongo;
