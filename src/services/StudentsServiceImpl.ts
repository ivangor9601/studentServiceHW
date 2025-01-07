import StudentsService from "./StudentsService";
import Student, {Scores} from "../models/Student";
import StudentsRepository from "../dao/StudentsRepository";

export default class StudentsServiceImpl implements StudentsService {
    private studentsRepository: StudentsRepository = new StudentsRepository();

    addStudent(student: Student): boolean {
        if(this.studentsRepository.readAll().findIndex(st => st.id === student.id) === -1) {
            return this.studentsRepository.write(student);
        }
        return false;
    }

    findStudent(id: number): Student {
        const index = this.studentsRepository.readAll().findIndex(st => st.id === id);
        if(index === -1){
            throw new Error("Student not found");
        }
        return this.studentsRepository.readAll()[index];
    }

    getStudentsByName(name: string): Student[] {
        const studentArr = this.studentsRepository.readAll().filter(st => st.name === name);
        if(studentArr.length === 0){
            throw new Error(`No students with name ${name} were found`);
        }
        return studentArr;
    }

    removeStudent(id: number): Student {
        const index = this.studentsRepository.readAll().findIndex(st => st.id === id);
        if(index === -1){
            throw new Error("Student not found");
        }
        const studentToRemove = this.studentsRepository.readAll()[index];
        const studentArr = this.studentsRepository.readAll().filter(st => st.id !== id);
        this.studentsRepository.writeAll(studentArr);
        return studentToRemove;
    }

    updateStudent(id: number, updateInfo: unknown): Student {
        const studentArr = this.studentsRepository.readAll();
        const index = studentArr.findIndex(st => st.id === id);
        if(index === -1){
            throw new Error("Student not found");
        }
        if((updateInfo as { "name": string, "password": string }).name){
            studentArr[index].name = (updateInfo as { "name": string, "password": string }).name;
        }
        if((updateInfo as { "name": string, "password": string }).password){
            studentArr[index].password = (updateInfo as { "name": string, "password": string }).password;
        }
        this.studentsRepository.writeAll(studentArr);
        return studentArr[index];
    }

    addScore(id: number, info: { examName: string, score: number }): boolean {
        const studentArr = this.studentsRepository.readAll();
        const index = studentArr.findIndex(st => st.id === id);
        if(index === -1){
            throw new Error("Student not found");
        }
        if(!studentArr[index].scores) {
            studentArr[index].scores = {};
        }
        studentArr[index].scores[info.examName.toLowerCase() as keyof Scores] = info.score;
        return this.studentsRepository.writeAll(studentArr);
    }
}