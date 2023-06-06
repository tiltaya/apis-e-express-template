import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { COURSE_STACK, TCourse, TStudent } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

// Teste API
app.get('/', (req: Request, res: Response) => {
    res.send('API rodando!')
})

// Ping
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// Procurar todos os cursos
app.get('/courses', (req: Request, res: Response) => {
    res.status(200).send(courses)
})

// Procurar curso por nome
app.get('/courses/search', (req: Request, res: Response) => {
    // const {name} = req.query
    const name = req.query.name as string
    if (!name) {
        res.status(403).send('Parâmetro de busca não informado')
    }
    const coursesByName = courses.filter((course) => {
        return course.name.toLowerCase().includes(name.toLowerCase())
    })
    res.status(200).send(coursesByName)
})

// Adicionar novo curso
app.post('/courses', (req: Request, res: Response) => {
    const {id, name, lessons, stack} = req.body
    if (stack !== COURSE_STACK.FRONT && stack !== COURSE_STACK.BACK) {
        res.status(403).send('Stack inválido')
    }
    const newCourse: TCourse = {id, name, lessons, stack}
    courses.push(newCourse)
    res.status(201).send('Curso registrado com sucesso')
    console.log(courses);
})

//                   > EXERCÍCIO DE FIXAÇÃO <

// Procurar todos os estudantes
app.get('/students', (req: Request, res: Response) => {
    res.status(200).send(students)
})

// Procurar estudante por nome
app.get('/students/search', (req: Request, res: Response) => {
    // const {name} = req.query
    const name = req.query.name as string
    if (!name) {
        res.status(403).send('Parâmetro de busca não informado')
    }
    const studentsByName = students.filter((students) => {
        return students.name.toLowerCase().includes(name.toLowerCase())
    })
    res.status(200).send(studentsByName)
})

// Adicionar novo estudante
app.post('/students', (req: Request, res: Response) => {
    const {id, name, age} = req.body
    const newStudent: TStudent = {id, name, age}
    students.push(newStudent)
    res.status(201).send('Estudante registrado com sucesso')
    console.log(students);
})

