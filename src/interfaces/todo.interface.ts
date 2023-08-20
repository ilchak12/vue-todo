export interface ITodoList {
    id?: number,
    title: string,
    todos?: ITodo[]
}

export interface ITodo {
    title: string,
    isCompleted: boolean,
}
