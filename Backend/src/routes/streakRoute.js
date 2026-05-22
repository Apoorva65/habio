import express from 'express'
import db from '../db.js';

const route = express.Router()

function calculateStreak(dates){
    if(dates.length === 0){
        return 0;
    }
    const streak = 0;
    const current = new Date();
    current.setDate(current.getDate()-1)

    for(let i=0;i<dates.length;i++){
        const expected = current.toISOString().split('T')[0]

        if(dates[i]===expected){
            streak++;
            current.setDate(current.getDate()-1)
        }
        else{
            break;
        }
    }
    return streak;
}

route.get('/:id',(req,res)=>{
    const {id} = req.params
    const completions = db.prepare(`SELECT completed_date FROM completed WHERE habit_id = ?
                                    ORDER completed_date DESC`)
    const completionDates = completions.all(id)

    const dates = completionDates.map(c => c.completed_date)
    const streak = calculateStreak(dates);

    res.json({streak})
})

export default route;