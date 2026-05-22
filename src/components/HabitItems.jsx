import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import { deleteHabits } from '../api/habits';
import { deleteCompleted, postCompleted } from '../api/completed';
import { getStreak } from '../api/streaks';

function HabitItems({habits,deleteHabitsbyId,setToggle}) {

  const [streak,setStreak] = useState({});

  async function deleteOne(id){
    await deleteHabits(id)
    deleteHabitsbyId(id)
  }

  async function handleCheck(habit) {
    if(habit.completion_id){
      await deleteCompleted(habit.id,habit.completion_id)
    }
    else{
      await postCompleted(habit.id)
    }
    setToggle(prev => !prev)
  }

  useEffect(()=>{
    if(habits.length===0) return;

    async function str() {
      const ids = habits.map(h=>h.id);
      const newStreaks = {}
      for(let i=0;i<ids.length;i++){
        const s = await getStreak(ids[i])
        newStreaks[ids[i]] = s;
      }
      setStreak(newStreaks)
      // console.log(streak);
      
    }

    str();
    
  },[habits])

  return (
    <List sx={{ px: 3, py: 2, maxWidth: '600px', margin: '0 auto' }}>
      {habits.length > 0 ? (
        habits.map((habit) => (
        <ListItem key={habit.id}
        sx={{
        display: 'flex', 
        justifyContent: 'space-between',
        backgroundColor: 'background.paper',
        borderRadius: '10px',
        mb: 1,
        border: '0.5px solid',
        borderColor: 'divider',
      }}>
            <Checkbox sx={{ color: 'text.secondary' }}
            checked = {habit.completion_id!==null}
            onChange={()=>handleCheck(habit)}
            />
            <ListItemText primary={habit.habit_name} 
            primarytypographyprops={{
            fontSize: '15px',
            fontWeight: 500,
            color: 'text.primary',
            }}/>

            <ListItemText primary={<span style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                          🔥 {streak[habit.id] ?? 0}</span>}
            />
            <Button color='error' onClick={()=>deleteOne(habit.id)}><DeleteIcon/></Button>
        </ListItem>
        ))
) : (
    <Typography 
      variant="h6"
      sx={{ 
      textAlign: 'center', 
      mt: 10,
      color: 'text.secondary',
      letterSpacing: '0.05em',
    }}>
      No habits yet. Add one above!
    </Typography>
    )}
    </List>
  );
}

export default HabitItems;
