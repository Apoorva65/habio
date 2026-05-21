import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

function HabitItems({habits}) {
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
            <Checkbox sx={{ color: 'text.secondary' }}/>
            <ListItemText primary={habit.habit_name} 
            primarytypographyprops={{
            fontSize: '15px',
            fontWeight: 500,
            color: 'text.primary',
            }}/>
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
