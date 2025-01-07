import StudentsService from "../services/StudentsService";
import Student from "../models/Student";

export default class StudentsController {
    private studentsService: StudentsService;

    constructor(studentsService: StudentsService) {
        this.studentsService = studentsService;
    }

    addStudent(student: unknown) {
        const isSuccess = this.studentsService.addStudent(student as Student);
        if(!isSuccess) {
            throw new Error("Student already in database");
        }
        return true;
    }

    findStudent(id: number): Student {
        return this.studentsService.findStudent(id);
    }

    getQuantity(studentArr: string[]): number {
        return this.studentsService.getQuantity();
    }

    getStudentsByName(name: string): Student[] {
        return this.studentsService.getStudentsByName(name);
    }

    removeStudent(id: number): Student {
        return this.studentsService.removeStudent(id);
    }

    updateStudent(id: number, updateInfo: { "name": string, "password": string }): Student {
        return this.studentsService.updateStudent(id, updateInfo);
    }

    addScore(id: number, info: { examName: string, score: number }): boolean {
        return this.studentsService.addScore(id, info);
    }
}