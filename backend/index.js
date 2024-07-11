const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
const ContactRouter = require('./Routes/ContactRouter');

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Hello from Backend")
})

app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)
app.use('/contact', ContactRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
