import type Github from '../types/github';

const API_BASE_URL: string = 'https://api.github.com';
export const perPage: number = 100;

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });
    if (response.status === 403) throw new Error('Rate limit exceeded')
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur API');
    }

    return response.json();
}

export async function searchUsers(query: string, options: object, page: number = 1): Promise<Github> {
    const requestApi: Github = await request(`/search/users?q=${query}&per_page=${perPage}&page=${page}`, options);

    requestApi.totalPage = Math.ceil(requestApi.total_count / perPage);

    return requestApi;
}