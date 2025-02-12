import express from "express";
import fs from "fs";


const getAllProducts = async (req, res) => {
    try {
        const data = fs.readFileSync("data/products.json", "utf-8");
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData);
    } catch(error) {
        console.log("Error fetching data: ", error);
        res.status(500).json({error: error});
    }
}

export { getAllProducts };