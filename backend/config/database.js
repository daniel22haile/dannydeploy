const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const myDatabaseMongoServer = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database is successfully connected..."))
    .catch((err) => {
      console.log("Database is NOT connected...", err.message);
    });
};

module.exports = myDatabaseMongoServer;
