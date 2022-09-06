import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.js';

const port = 8000;
const app = express();

app.get('/hello', (req, res) => {
  res.cookie('token', 'asdfsa', {
    domain: '',
    path: '/',
    secure: true,
  })
  // res.clearCookie('token')
  res.send('Hello!')
})

app.use('/users', userRouter);

app.get('/error', (req, res) => {
  throw new Error('Error');
})

app.use((err: Error , req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(401).send(err.message);
})

app.listen(port, () => {
  console.log(`server started on PORT: ${port}`)
})