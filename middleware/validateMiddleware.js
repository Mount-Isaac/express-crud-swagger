export const validatePost = (req, res, next) => {
    const { title } = req.body
    if (!title) {
        const err = new Error("title is required!");
        err.status = 400;
        return next(err);
    }
    next()
}


export const validateRegisterUser = (req, res, next) => {
    const data = req.body
    if (!data){
        return res.status(400).json( { message: "Invalid data format. JSON expected"} )
    }
    const {username, firstName, lastName, password} = req.body

    if (!username || !firstName || !lastName || !password){
        const err = new Error("username, firstName, lastName, password are required fields");
        err.status = 400;
        return next(err);
    }
    next()
}

export const validateLoginUser = (req, res, next) => {
    const data = req.body
    if (!data){
        return res.status(400).json( { message: "Invalid data format. JSON expected"} )
    }
    const {username, password} = req.body

    if (!username ||  !password){
        const err = new Error("username, password are required fields");
        err.status = 400;
        return next(err);
    }
    next()
}