import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { postHabits } from '../api/habits';

function Topbar({addHabits}){

    const [habitName,setHabitName] = useState('')

    async function createHabit(e){
        e.preventDefault()
        const newHabit = await postHabits(habitName)
        addHabits(newHabit)
        setHabitName('')
    }

    return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MY HABITS
          </Typography>
          <form onSubmit={createHabit} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Enter a habit..."
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                width: '220px'
              }}
            />
            <Button type="submit" variant="outlined" sx={{ borderRadius: '8px', whiteSpace: 'nowrap' }}>
              + Add Habit
            </Button>
          </form>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default Topbar;