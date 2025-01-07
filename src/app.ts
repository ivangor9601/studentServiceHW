import express, {Application, NextFunction, Request, Response} from "express";
import studentsRoutes from "./routes/studentsRoutes";

const app: Application = express();
const PORT = 8080;

app.use(express.json());

app.use(studentsRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({error: err.message});
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})