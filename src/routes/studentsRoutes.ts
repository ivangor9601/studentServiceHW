import {Router} from "express";
import StudentsServiceImpl from "../services/StudentsServiceImpl";
import StudentsController from "../controller/StudentsController";
import validationMiddleware from "../middleware/validationMiddleware";
import {body} from "express-validator";
import asyncHandler from 'express-async-handler';

const router = Router();

const studentsService = new StudentsServiceImpl();
const studentsController = new StudentsController(studentsService);

router.post('/student',
    body("id").notEmpty(),
    body("name").isString().notEmpty(),
    body("password").isString().notEmpty(),
    validationMiddleware, asyncHandler(async (req, res) => {
    const result = studentsController.addStudent(req.body);
    if(result){
        res.send("Student successfully added");
    }
}));

router.get('/student/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = studentsController.findStudent(parseInt(id as string));
    res.json(result);
}));

router.get('/students/name/:name', asyncHandler(async (req, res) => {
    const name = req.params.name;
    const result = studentsController.getStudentsByName(name as string);
    res.json(result);
}));

router.delete('/student/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = studentsController.removeStudent(parseInt(id as string));
    res.json(result);
}));

router.put('/student/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = studentsController.updateStudent(parseInt(id as string), req.body);
    res.json(result);
}));

router.put('/score/student/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = studentsController.addScore(parseInt(id as string), req.body);
    if(result){
        res.send("Score successfully added");
    }
}));

export default router;