import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const getAllProducts = async (req, res) => {
  try {
    const data = fs.readFileSync("data/products.json", "utf-8");
    const products = JSON.parse(data);

    if (!products || products.length === 0) {
        return res.status(404).json({ error: "No products found" });
      }

    const filteredProducts = products.map(({ 
        id, name, photo, price, stock, category, collection, briefdescription, tags 
      }) => ({
        id, name, photo, price, stock, category, collection, briefdescription, tags
      }));
      res.status(200).json(filteredProducts);

  } catch (error) {
    console.log("Error fetching data: ", error);
    res.status(500).json({ error: error });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = fs.readFileSync("data/products.json", "utf-8");
    const products = JSON.parse(data);
    const productById = products.find((product) => product.id === id);

    if (productById) {
      const { id, name, photo, price, stock, fulldescription, caretips } =
        productById;
      res
        .status(200)
        .json({ id, name, photo, price, stock, fulldescription, caretips });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log("Error fetching Product by ID data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getReviews = async (req, res) => {
  try {
    const id = req.params.id;
    const data = fs.readFileSync("data/products.json", "utf-8");
    const products = JSON.parse(data);
    const productById = products.find((product) => product.id === id);

    if (productById) {
      res.status(200).json(productById.reviews || []);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log(`Error fetching reviews for Product Id ${id}: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const data = fs.readFileSync("data/products.json", "utf-8");
    const products = JSON.parse(data);
    const productById = products.find((product) => product.id === id);

    if (!productById) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!productById.reviews || productById.reviews.length === 0) {
      return res
        .status(404)
        .json({ error: "No reviews available for this product" });
    }

    const review = productById.reviews.find(
      (review) => review.userId.toString() === reviewId.toString()
    );

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.log(`Error fetching review with ID: ${reviewId} ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const postNewReview = async (req, res) => {
try {
  const { id } = req.params;
  const {
    userId, 
    name, 
    city, 
    province, 
    review, 
    rate
  } = req.body;

  if (
    !userId ||
    !name || 
    !city || 
    !province || 
    !review || 
    !rate
  ) {
    return res.status(400).json({ message: "All fields are required"})
  }

  const data = fs.readFileSync("data/products.json", "utf-8");
  const products = JSON.parse(data);
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return res.status(404).json({message: "Product not found"})
  }

  const newReview = {
    reviewId: uuidv4(),
    name, 
    city, 
    province, 
    review, 
    rate, 
    timestamp: Date.now()
  }

  if (!products[productIndex].reviews) {
    products[productIndex].reviews = [];
  }

  products[productIndex].reviews.push(newReview);

  fs.writeFileSync("data/products.json", JSON.stringify(products, null, 2))

  res.status(201).json({ message: "Review added successfully", newReview });

} catch(error) {
    console.log(`Error adding a new review: ${error}`);
    res.status(500).json({ message: "Failed to add a new review" });
  }
}

export { getAllProducts, getProductById, getReviews, getReviewById, postNewReview };
