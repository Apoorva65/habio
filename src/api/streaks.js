import api from './axiosInstance'

export async function getStreak(id) {
    const streak = api.get(`/streaks/${id}`)
    return streak;
}