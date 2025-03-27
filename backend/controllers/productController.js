import { sql } from "../config/db.js";
export const getProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT * FROM products
      ORDER BY created_at DESC
    `;

    console.log("Fetched Products", products)
    res.status(200).json({sucess: true, data: products});
  } catch (error) {
    console.error("Error in getProducts function", error);
    res.status(500).json({sucess: false, message: "Internal Server Error"});
  }
};

export const createProduct = async (req, res) => {
  const {name, price, image} = req.body;
  if (!name || !price || !image) {
    return res.status(400).json({sucess: false, message: "All fields are required"});
  }

  try {
    const newProducts = await sql`
      INSERT INTO products (name, price, image)
      VALUES (${name}, ${price}, ${image})
      RETURNING *
    `;
    console.log("New Product added: ", newProducts);
    res.status(201).json({sucess: true, data: newProducts[0] });

    
  } catch (error) {
    console.error("Error in createProduct function", error);
    res.status(500).json({sucess: false, message: "Internal Server Error"});
  }


};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
      SELECT * FROM products
      WHERE id = ${id}
    `;

    if (product.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product[0] });

  } catch (error) {
    console.error("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const {id} = req.params;
  const {name, price, image} = req.body;

  try {
    const updateProducts = await sql`
      UPDATE products
      SET name = ${name}, price = ${price}, image = ${image}
      WHERE id = ${id}
      RETURNING *
    `
    if (updateProducts.length === 0) {
      return res.status(404).json({
        sucess: false,
        message: "Product not found"});
    }

    res.status(200).json({
      sucess: true,
      data: updateProducts[0],
    });
    
  } catch (error) {
    console.error("Error in updateProduct function", error);
    res.status(500).json({sucess: false, message: "Internal Server Error"});
  }

};

export const deleteProduct = async (req, res) => {

  const {id} = req.params;

  try {
    const deletedProduct = await sql`
      DELETE FROM products
      WHERE id = ${id} RETURNING *
    `;

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        sucess: false,
        message: "Product not found"});
    }
    
    res.status(200).json({sucess: true, data: deletedProduct[0]});
    
  } catch (error) {
    console.log("Error in deleteProduct function", error);
    res.status(500).json({sucess: false, message: "Internal Server Error"});
  }

};
