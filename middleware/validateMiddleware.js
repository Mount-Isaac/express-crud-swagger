export const validatePost = (req, res, next) => {
    const { Title } = req.body
    if (!Title) {
        const err = new Error("Title is required!")
        return next(err)
    }
    next()
}