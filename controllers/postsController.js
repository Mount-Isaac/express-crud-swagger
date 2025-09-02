import { Post } from "../models/posts.js"
// import { validatePost } from "../middleware/validateMiddleware.js";

// get all posts
export const getPosts =  async(req, res)=>{
    const limit = parseInt(req.query.limit)
    const posts = await Post.findAll();

    if(!isNaN(limit) && limit > 0){
        return res.status(200).json(posts.slice(0,limit))
    } 
    res.status(200).json(posts)
}

// Create a post
export const createPost = async(req,res,next)=>{
    const data = req.body
    if(!data){
        const error = new Error('JSON format expected')
        error.status = 400
        return next(error)
    }
    if (!data.title){
        const error = new Error('title is required!')
        error.status = 400
        return next(error)
    }
    const post = await Post.create(data)
    res.status(201).json(post)
}

// get post by id
export const getPostById = (req,res)=>{
    const id = parseInt(req.params.id)
    const post = posts.find(post=>post.id === id)

    if (!post){
        return res.status(404).json(
            {
                success: false,
                message: `Post with id ${id} does not exist!`
            }
        )
    }
    res.status(200).json({
        data: post,
        success: true
    })
}

// update post by id
export const updatePostTitle = async(req,res, next)=>{
    const id = parseInt(req.params.id)
    const data = req.body

    const post = await Post.findOne({ where: { id }})
    if (!post){
        const error = new Error("Post not found")
        error.status = 404
        return next(error)
    }

    if (post.title === data.title){
        return res.status(200).json(
            {
                success: true,
                message: "No changes applied",
                data: post
            }
        )
    }
    post.title = data.title
    await post.save()

    res.status(200).json({
        data: post,
        success: true
    })
}
export const updateWholePost = async(req,res, next)=>{
    const id = parseInt(req.params.id)
    const data = req.body
    console.log("description", data.description)

    const post = await Post.findOne({ where: { id }})
    if (!post){
        const error = new Error("Post not found")
        error.status = 404
        return next(error)
    }

    // if (post.title === data.title){
    //     return res.status(200).json(
    //         {
    //             success: true,
    //             message: "No changes applied",
    //             data: post
    //         }
    //     )
    // }
    post.title = data.title
    post.description = data?.description ? data.description : post.description
    await post.save()

    res.status(200).json({
        data: post,
        success: true
    })
}

// delete post by id
export const deletePost =  async(req,res, next)=>{
    const id = parseInt(req.params.id)

    const post = await Post.findOne({ where: { id }})
    if (!post){
        const error = new Error("Post not found")
        error.status = 404
        return next(error)
    }

    await post.destroy()
    res.status(200).json({
        message: "Post deleted successfully!",
        success: true
    })
}