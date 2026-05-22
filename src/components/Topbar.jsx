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
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg,#1f1f1f,#2d2d2d)",
          borderRadius: "0 0 24px 24px",
          px: 2,
          py: 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                letterSpacing: "-0.04em",
              }}
            >
              Hab
              <Box
                component="span"
                sx={{ color: "#90caf9" }}
              >
                io
              </Box>
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.7)",
                mt: 0.5,
              }}
            >
              Build consistency one day at a time
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "#90caf9",
              mt: 0.5,
              fontWeight: 500,
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>

          <form
            onSubmit={createHabit}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <TextField
              size="small"
              placeholder="Enter a habit..."
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              sx={{
                width: "240px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "12px",
                px: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              + Add Habit
            </Button>
          </form>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default Topbar;