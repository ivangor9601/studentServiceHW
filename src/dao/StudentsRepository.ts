import Student from "../models/Student";
import * as fs from "node:fs";

export default class StudentsRepository {
    private readonly filePath: string;

    constructor(filePath = './src/database/db.txt') {
        this.filePath = filePath;
    }

    readAll(): Student[] {
        try {
            const res = fs.readFileSync(this.filePath, {encoding: 'utf-8'});
            return JSON.parse(res) as Student[];
        } catch (err: any) {
            console.log(`Error while reading database: ${err}`);
            return [];
        }
    }

    write(student: Student): boolean {
        try {
            const students = this.readAll();
            students.push(student);
            return this.writeAll(students);
        } catch (err: any) {
            console.log(`Error while writing in database: ${err}`);
            return false;
        }
    }

    writeAll(students: Student[]): boolean {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(students, null, 2), {encoding: 'utf-8'});
            return true;
        } catch (err: any) {
            console.log(`Error while writing in database: ${err}`);
            return false;
        }
    }
}