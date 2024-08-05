const connectToMongo = require('./db');
connectToMongo();
const cors = require('cors');
const express = require('express');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts')
const app = express()
const port = 5000

app.use(express.json());
app.use(cors());
// These are the routes that we have created in the Backend/routes folder:
app.use('/api/user',userRouter );
app.use('/api/post', postRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})