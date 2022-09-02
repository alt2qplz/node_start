import express from 'express';
const port = 8000;
const app = express();

app.all('/hello', (req, res, next) => {
  console.log('HELLO!');
  next();
})

const cb = (req, res, next) => {
  console.log('CB');
  next();
}

app.get('/hello', [cb, cb, cb, (req, res) => {
  res.send('Hello!')
}])

app.listen(port, () => {
  console.log(`server started on PORT: ${port}`)
})