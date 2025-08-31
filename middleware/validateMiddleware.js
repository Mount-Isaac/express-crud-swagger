export const validatePost = (req, res, next) => {
    const { title } = req.body
    if (!title) {
        const err = new Error("title is required!")
        return next(err)
    }
    next()
}