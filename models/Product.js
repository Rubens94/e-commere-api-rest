
const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: { type: String, required: true},
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    
  },
  { timestamps: true }
);

ProductSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model("Product", ProductSchema);