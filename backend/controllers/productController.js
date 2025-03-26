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
      RETURINING *
    `;
    console.log("New Product added: ", newProducts);
    res.status(201).json({sucess: true, data: newProducts[0] });

    
  } catch (error) {
    console.error("Error in createProduct function", error);
    res.status(500).json({sucess: false, message: "Internal Server Error"});
  }


};

export const getProduct = async (req, res) => {
  const {id} = req.params;

  try {
    await sql`
      SELECT * FROM products
      WHERE id = ${id}
    `;
    
  } catch (error) {
    console.error("Error in getProduct function", error);
    res.status(500).json({sucess: false, message: "Internal Server Error"});
  }
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};
