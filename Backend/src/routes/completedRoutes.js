import express from 'express'
import db from '../db.js'

const router = express.Router()

router.post('/',(req,res)=>{
    const {habit_id,completed_date} = req.body
    const postCompleted = db.prepare(`INSERT INTO completed (habit_id,completed_date) VALUES (?,?)`)
    const result = postCompleted.run(habit_id,completed_date)

    res.json({id : result.lastInsertRowid,habit_id,completed_date})
})

router.delete('/:id',(req,res)=>{
    const {habit_id} = req.body
    const {id} = req.params

    const deleteCompleted = db.prepare('DELETE FROM completed WHERE id = ? AND habit_id = ?')
    deleteCompleted.run(id,habit_id)

    res.json({message : "Entry deleted"})
})

export default router;