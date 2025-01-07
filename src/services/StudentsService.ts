import Student from "../models/Student";

export default interface StudentsService {
    addStudent(student: Student): boolean;

    findStudent(id: number): Student;

    removeStudent(id: number): Student;

    updateStudent(id: number, updateInfo: { "name": string, "password": string }): Student;

    getStudentsByName(name: string): Student[];

    addScore(id: number, info: { examName: string, score: number }): boolean;
}