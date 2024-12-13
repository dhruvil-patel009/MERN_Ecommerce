import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoriesController, singleCategoriesController, updateCategoryController } from '../controllers/categoryController.js';


const router = express.Router()


//routes
// create Category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)


//Update Category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)


// get all Category
router.get('/get-category', getAllCategoriesController)

// Get single Category
router.get('/single-category/:slug', singleCategoriesController)


// delete Category controller
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router
