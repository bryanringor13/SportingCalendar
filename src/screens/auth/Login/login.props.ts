export interface AuthDetails {
    email: string;
    password: string;
}

export interface PropsLogin {
    span?: string;
    title: string;
    description?: string;
    back?: boolean;
}