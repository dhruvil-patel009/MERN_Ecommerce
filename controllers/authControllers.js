import { hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }

    // check user
    const existingUser = await userModels.findOne({ email });
    //exisiting user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please Login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModels({
      name,
      email,
      phone,
      address,
      password: hashPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfuly",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

export default { registerController };
