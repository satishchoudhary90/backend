import { Router } from "express";
import { addInstance,getCourseByYrSem, getCourseByYrSemId, delInst } from "../controllers/instance.controller.js";

const InstanceRouter = Router();

InstanceRouter.post('/addInstance/:id', addInstance)

InstanceRouter.get('/getCourseSem/:yr/:sem', getCourseByYrSem)

InstanceRouter.get('/getCourseId/:yr/:sem/:id', getCourseByYrSemId)

InstanceRouter.delete('/delCourse/:yr/:sem/:id', delInst)


export default InstanceRouter