import api from './axiosInstance'

export async function getStreak(id) {
    const {data} = await api.get(`/streaks/${id}`)
    return data;
}