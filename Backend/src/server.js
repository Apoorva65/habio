import express from 'express'
import habitRoutes from './routes/habitRoutes.js'
import completedRoutes from './routes/completedRoutes.js'

const app = express()
const port = process.env.PORT || 5001

app.use(express.json());

app.use('/api/habits',habitRoutes)
app.use('/api/completed',completedRoutes)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);    
})