import React, { useEffect, useState } from "react";
import { getCompletedofHabit } from "../api/habits";
import { Box } from "@mui/material";

function Heatmap({habitId,toggle}){

    const [completedDates,setCompletedDates] = useState([])

    useEffect(()=>{

        async function getDates() {
            const habits = await getCompletedofHabit(habitId)
            const dates = habits.map(h=>h.completed_date)
            const last7days = getLast7days();

            const days = last7days.map((date)=>({
                date,
                completed : dates.includes(date)
            }))

            setCompletedDates(days)
        }
        getDates();    
    },[toggle])

    function getLast7days(){
        const current = new Date();
        const dates = [];
        for(let i=0;i<7;i++){
            const date = current.toISOString().split('T')[0]
            dates.push(date);
            current.setDate(current.getDate()-1);
        }
        return dates;
    }

    return(
        <Box
            sx={{
                display:"grid",
                gridTemplateColumns:"repeat(7,1fr)",
                gap:1
            }}
            >
            {completedDates.map(day=>(
                <Box
                key={day.date}
                sx={{
                    width:20,
                    height:20,
                    borderRadius:"4px",
                    backgroundColor:
                        day.completed
                        ? "#4caf50"
                        : "#424242"
                }}
                />
            ))}
        </Box>
    )

}

export default Heatmap;