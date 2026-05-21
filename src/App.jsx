import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material'
import Topbar from './components/Topbar'
import HabitItems from "./components/HabitItems";
import CssBaseline from '@mui/material/CssBaseline'
import { getHabits } from "./api/habits";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e2e8f0',      // almost white
    },
    secondary: {
      main: '#94a3b8',      // muted grey-blue
    },
    background: {
      default: '#111111',   // near black
      paper: '#1c1c1c',     // dark grey for cards
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#64748b',
    }
  }
})

function App() {

  const [habits,setHabits] = useState([]);

  useEffect(()=>{
    getHabits().then(setHabits).catch(console.error)
  },[])

  function addHabits(habit){
    setHabits((prevHabits)=>[...prevHabits,habit])
  }

  function deleteHabitsbyId(id){
    setHabits((prevHabits)=>prevHabits.filter((h)=>h.id!=id))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Topbar addHabits = {addHabits}/>
      <HabitItems habits = {habits} deleteHabitsbyId = {deleteHabitsbyId}/>
    </ThemeProvider>
  )
}

export default App
