import api from "./axiosInstance";

export async function getHabits(){
    const {data} = await api.get('/habits')
    return data
}

export async function postHabits(habit_name) {
    const {data} = await api.post('/habits',{habit_name})
    return data;
}

export async function  deleteHabits(id) {
    await api.delete(`/habits/${id}`)
}