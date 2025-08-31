let posts = [
    {id:0, Title: "Post one"},
    {id:1, Title: "Post Two"},
    {id:2, Title: "Post Three"},
    {id:3, Title: "Post Four"},
    {id:4, Title: "Post Five"},
]

// get all posts
export const getPosts =  (req, res)=>{
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0){
        return res.status(200).json(posts.slice(0,limit))
    } 
    res.status(200).json(posts)
}

// Create a post
export const createPost = (req,res,next)=>{
    const data = req.body
    if(!data){
        const error = new Error('JSON format expected')
        error.status = 400
        return next(error)
    }
    if (!data.Title){
        const error = new Error('Title is required!')
        error.status = 400
        return next(error)
    }
    const next_id = posts.length + 1
    const post = {
        id: next_id,
        Title: data.Title
    }
    posts.push(post)
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
export const updatePost = (req,res)=>{
    const id = parseInt(req.params.id)
    const post = posts.find(post=>post.id === id)
    const data = req.body

    if (!post){
        return res.status(404).json(
            {
                success: false,
                message: `Post with id ${id} does not exist!`
            }
        )
    }
    posts[id].Title = data?.Title ? data.Title : post.Title
    res.status(200).json({
        data: posts,
        success: true
    })
}

// delete post by id
export const deletePost =  (req,res)=>{
    const id = parseInt(req.params.id)
    const post = posts.find(post=>post.id === id)
    const data = req.body

    if (!post){
        return res.status(404).json(
            {
                success: false,
                message: `Post with id ${id} does not exist!`
            }
        )
    }
    posts = posts.filter((post) =>(post.id !== id))
    res.status(200).json({
        data: posts,
        success: true
    })
}