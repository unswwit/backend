const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

// team 
app.get('/execs', (req, res) => {
 
})

app.get('/subcommittee', (req, res) => {
 
})

// events 
app.get('/past-events', (req, res) => {
 
})

app.get('/upcoming-events', (req, res) => {
 
})

// sponsors
app.get('/sponsors', (req, res) => {
 
})

// opportunities 
app.get('/opportunities', (req, res) => {
 
})

// resources 
app.get('/blogs', (req, res) => {
 
})

app.get('/blogs/blog-authors', (req, res) => {
 
})

app.get('/marketing-archives', (req, res) => {

})

app.get('/podcasts', (req, res) => {

})

app.get('/publications', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});