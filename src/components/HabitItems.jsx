import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import { deleteHabits } from '../api/habits';
import { deleteCompleted, postCompleted } from '../api/completed';

function HabitItems({habits,deleteHabitsbyId,setToggle}) {

  async function deleteOne(id){
    deleteHabits(id)
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

  return (
    <List sx={{ px: 3, py: 2, maxWidth: '600px', margin: '0 auto' }}>
      {habits.length > 0 ? (
        habits.map((habit) => (
        <ListItem key={habit.id}
        sx={{
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
