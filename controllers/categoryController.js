import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"
export const createCategoryController = async (req, res) => {
    try {

        const { name } = req.body
        if (!name) {
            return res.status(401).send({
                message: "Name is required"
            })
        }

        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "Category Created Successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

// Update Category

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}



//  get all Category

export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "Categories fetched successfully",
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While All Category ",
            error
        })
    }
}


// Single Category Controller

export const singleCategoriesController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });

        res.status(200).send({
            success: true,
            message: "Get Single Category fetched successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While Fetching Single Category",
            error
        })
    }
}



//  Delete Category

export const deleteCategoryController = async (req, res) => {
    try {
        await categoryModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While Deleting Category",
            error
        })
    }
}