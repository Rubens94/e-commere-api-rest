const Product = require("../models/Product");

const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
  
    try {
      await newProduct.save();
      res.status(200).json({msg: 'Created product'});
    } catch (err) {
      res.status(500).json(err);
    }
}


const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getProducts = async (req, res) => {
    const {category, newProduct, limit, page} = req.query;

    try {
        //let products;

        if (newProduct) {
        const products = await Product.find().sort({ createdAt: -1 }).limit(1);
        res.status(200).json(products)
        return 
        } else if (category) {
            const products = await Product.find({
                categories: {
                $in: [category],
                },
            })
            .skip( Number(page))
            .limit( Number(limit));
        return res.status(200).json(products)
        } else {
        const [ products, total] = await Promise.all([
            Product.find()
                .skip( Number(page) )
                .limit( Number(limit) ),
            Product.countDocuments()
        ])
        return res.status(200).json({total, products});
        }
        

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProducts
}