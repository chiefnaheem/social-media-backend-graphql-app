export type IPosts = {
    body: string;
    username: string;
    createdAt: string;
    comments: comments[];
    likes: likes[];
    user: IUsers;
}
type comments= {
    body: string;
    username: string;
    createdAt: string;
}
type likes ={
    username: string;
    createdAt: string;
}
export type IUsers = {
    username: string;
    password: string;
    email: string;
    createdAt: string;
}

export type validateRegister = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
