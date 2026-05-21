import express from 'express'
import db from '../db.js';

const router = express.Router();

router.get('/',(req,res)=>{
    const today = new Date().toISOString().split('T')[0]
    const getHabits = db.prepare(`SELECT h.id, h.habit_name, c.id as completion_id 
                                         FROM habit h
                                         LEFT JOIN completed c
                                         ON c.habit_id = h.id
                                         AND c.completed_date = ?`)
    const habits = getHabits.all(today)
    res.json(habits)
})

router.post('/',(req,res)=>{
    const {habit_name} = req.body
    const postHabits = db.prepare(`INSERT INTO habit (habit_name) VALUES (?)`)
    const result = postHabits.run(habit_name)

    res.json({id:result.lastInsertRowid,habit_name,completion_id:null})
})

// router.put('/:id',(req,res)=>{
//     const {id} = req.params
//     const {habit_name} = req.body
//     const updateHabit = db.prepare(`UPDATE habit set habit_name = ? WHERE id = ?`)
//     updateHabit.run(habit_name,id)

//     res.json({message : "Habit updated"})
// })

router.delete('/:id',(req,res)=>{
    const {id} = req.params
    const deleteHabit = db.prepare('DELETE FROM habit WHERE id = ?')
    deleteHabit.run(id)

    res.json({message : "Habit deleted"})
})

router.get('/:id',(req,res)=>{
    const {id} = req.params
    const getHabitsById = db.prepare('SELECT * FROM completed WHERE habit_id = ?')
    const habits = getHabitsById.all(id)

    res.json(habits);
})

export default router;