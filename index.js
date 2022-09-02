import express from 'express';
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

app.listen(port, () => {
  console.log(`server started on PORT: ${port}`)
})