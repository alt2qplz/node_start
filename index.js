import express from 'express';
import { userRouter } from './users/users.js';

const port = 8000;
const app = express();

app.get('/hello', (req, res) => {
  res.cookie('token', 'asdfsa', {
    domain: '',
    path: '/',
    secure: true,
    expires: 600_000
  })
  // res.clearCookie('token')
  res.send('Hello!')
})

app.use('/users', userRouter);

app.get('/error', (req, res) => {
  throw new Error('Error');
})

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(401).send(err.message);
})

app.listen(port, () => {
  console.log(`server started on PORT: ${port}`)
})