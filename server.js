import express from 'express'
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/error.js';
import { notFound } from './middleware/notFound.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'
import { sequelize } from './config/db.js';

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
app.use('/api/posts', postRoutes)

app.use('/api/auth', authRoutes)

// error middleware
app.use(notFound)
app.use(errorHandler)

// server:DB mount-running
sequelize.authenticate()
    .then(()=>{
        console.log("Database connection established successfully!");
        return sequelize.sync(); //creates tables if not exists
    })
    .then(()=>{
        app.listen(port, ()=>{console.log(`server is running on ${port}`)})
    })
    .catch(err => console.error("Database connection failed:", err))
