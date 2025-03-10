import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const createUser = async (req, res) => {
    const { id, first_name, last_name, email, password } = req.body;

    if (
        !first_name ||
        !last_name ||
        !email ||
        !password
    ) {
        return res.status(400).json({message: "All fields are required"})
    }

    try {
        const data = await knex("users").insert({
            first_name, 
            last_name,
            email, 
            password
        });
        res.status(201).json({message: "Your sign up was successful!"})
    } catch(error) {
        console.error("Couldn't sign up: ", error)
    }
}

export { createUser }