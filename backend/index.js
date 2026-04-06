const express           = require('express');
const cors              = require('cors');
const dotenv            = require('dotenv');
const productsRouter    = require("./routes/products")
const listRouter        = require("./routes/lists")
const listProductRouter = require("./routes/list_products")

dotenv.config() 

const app = express();
app.use(express.json());
app.use(cors());
app.use('/products',productsRouter)
app.use('/lists',listRouter)
app.use('/lists/:list_id/list_products',listProductRouter)


app.listen(process.env.PORT,() => {
    console.log(`Server running on port ${process.env.PORT}`);
});




