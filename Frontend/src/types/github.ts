
export interface User {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    duplicated?: boolean;
}

export default interface Github {
    incomplete_results: boolean;
    items: User[];
    total_count: number;
    totalPage: number;
}
