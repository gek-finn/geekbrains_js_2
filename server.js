const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());
app.use(cors());

app.get('/catalog', (req, res) => {
  fs.readFile('data/catalog.json', 'utf-8', (err, data) => {
    if (err) res.sendStatus(404);
    res.send(data);
  })
});

app.get('/cart', (req, res) => {
  fs.readFile('data/cart.json', 'utf-8', (err, data) => {
    if (err) res.sendStatus(404);
    res.send(data);
  })
});


app.post('/cartAdd', (req, res) => {
  const item = req.body;
  fs.readFile('data/cart.json', 'utf-8', (err, data) => {
    if (err) res.sendStatus(500);
    let cart = null;
    try {
      cart = JSON.parse(data);
    } catch(e){
      cart = data;
    }
    let itemFound = cart.filter(elem => elem.product_name === item.product_name)[0];
    if (itemFound){
      itemFound.count++;
    } else {
      item.count = 1;
      cart.push(item);
    }
    fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
      if (err) res.sendStatus(500);
      res.sendStatus(200);
    })
  })
});

app.post('/cartDel', (req, res) => {
  const item = req.body;
  fs.readFile('data/cart.json', 'utf-8', (err, data) => {
    if (err) res.sendStatus(500);
    let cart = null;
    try {
      cart = JSON.parse(data);
    } catch(e){
      cart = data;
    }
    let itemPos = -1;
    cart.forEach((elem, elemIndex)=>{
      if (elem.product_name === item.product_name){
        itemPos = elemIndex;
      }
    });
    if (itemPos >= 0){
      let itemFound = cart[itemPos];
      if (itemFound.count > 1){
        itemFound.count--;
      } else {
        cart.splice(itemPos,1)
      }
    };
    fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
      if (err) res.sendStatus(500);
      res.sendStatus(200);
    })
  })
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});