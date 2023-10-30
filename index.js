const express = require('express')
const { connection } = require('./db.js')
const { userRouter } = require('./route/userRoute.js')
const { postRoute } = require('./route/postRoute.js')

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

app.use('/users', userRouter)
app.use('/posts', postRoute)



app.listen(8080, async () => {
    try {
        await connection;
        console.log('his port is running at 8080')
    } catch (err) {
        console.log(err)
    }
})