import express from 'express'
import posts from './routes/posts.js'
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/error.js';
import { notFound } from './middleware/notFound.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'

const port = process.env.PORT || 8000
const app = express();

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Express Learning App", version: "1.0.0"}
    },
    apis: ["./routes/*.js"]
}
const swaggerSpec = swaggerJSDoc(options)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// base route
const welcomeMessage = "Hi, welcome.\nExpressJS app for Learning. Enjoy our APIs via /docs"
app.get('/', (req,res)=>{
    res.send({message: welcomeMessage});
});

app.post('/', (req,res)=>{
    res.send({message: welcomeMessage});
});

// custom middleware
app.use(logger)

// routes
app.use('/api/posts', posts)

// error middleware
app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{console.log("server is running")})