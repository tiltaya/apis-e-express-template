export enum COURSE_STACK {
    FRONT = "Front-end",
    BACK = "Back-end"
}

export type TCourse = {
    id: string,
    name: string,
    lessons: number,
    stack: COURSE_STACK
}

export type TStudent = {
    id: string,
    name: string,
    age: number
}