import api from "./axiosInstance";

export async function postCompleted(habit_id) {
    const today = new Date().toISOString().split('T')[0]
    const {data} = await api.post('/completed',{habit_id,completed_date : today})
    return data;
}

export async function deleteCompleted(habit_id,completion_id) {
    await api.delete(`/completed/${completion_id}`,{data : {habit_id}})
}