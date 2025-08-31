import express from 'express'
import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from '../controllers/postsController.js'
import { validatePost } from '../middleware/validateMiddleware.js'

const router = express.Router()


/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: get all posts
 *     responses:
 *       200:
 *         description: a list of all posts
 */
router.get('/', getPosts)


/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created post
 */
router.post('/', createPost)


/**
 * @swagger
 * /api/posts/{id}:
 *  get:
 *   summary: Get single post  by id
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *   responses:
 *      200:
 *          description: The requested post
 *      400:
 *          description: Error occurred
 *      404: 
 *          description: Post not found
 */
router.get('/:id', getPostById)

/**
 * @swagger
 * /api/posts/{id}:
 *  put:
 *   summary: update a post by id
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *   responses:
 *      200:
 *          description: list of posts after update
 *      400:
 *          description: Error occurred
 *      404: 
 *          description: Post not found
 */
router.put('/:id', validatePost, updatePost)

/**
 * @swagger
 * /api/posts/{id}:
 *  delete:
 *   summary: delete a post by id
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *   responses:
 *      200:
 *          description: list of the updated posts after deletion
 *      400:
 *          description: Error occurred
 *      404: 
 *          description: Post not found
 */
router.delete('/:id', deletePost)

export default router