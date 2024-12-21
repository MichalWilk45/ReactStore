const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// App init

const app = express();
const PORT = 500;

app.use(cors());
app.use(bodyParser.json())

//endpoints

app.get('/', (req,res) => {
    res.send('Serwer działa');
});

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
})


//mock data

const products = [
    {id: 1, name: 'Produkt 1', category: 'Kategoria 1', price: 100},
    {id: 2, name: 'Produkt 2', category: 'Kategoria 2', price: 200},
];

const categories = ['Kategoria 1', 'Kategoria 2', 'Kategoria 3'];

app.get('/products', async (req,res) => {
    try{
        const productsFromDB = await Product.find();
        res.json(productsFromDB);
    } catch(err) {
        res.status(500).json({message: 'Błąd przy pobieraniu danych z bazy', error: err})
    }
});

app.get('/categories', (req,res) => {
    res.json(categories);
});



// Konfiguracja CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Adres frontendu (React)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Dozwolone metody
  credentials: true, // Jeśli używasz ciasteczek
};

app.use(cors(corsOptions)); // Włącz CORS dla całej aplikacji


//Database connection

mongoose.connect('mongodb://localhost:27017/Sklep',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Połączono z MongoDB');
})
.catch((err) => {
    console.error('Błąd połączenia z Bazą Danych MongoDB ', err)
});

const Product = require('./models/Product');

app.post('/products', async (req,res) => {
    const {name, category, price} = req.body;

    const newProduct = new Product({name, category, price});

    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({message: 'Błąd przy zapisie produktu', error: err });
    }
});