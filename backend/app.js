const express = require('express');
const cors = require('cors');

const initiateMyMongoServer = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes')

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

//db connection
initiateMyMongoServer();

app.use("/user",  userRoutes);
app.use("/", imageRoutes);

app.use((err, req, res, next) => {
    if(err) return new Error(err.message)
})

//Error handler
app.listen(PORT, ()=> console.log(`Server is running at port  ${PORT}`))