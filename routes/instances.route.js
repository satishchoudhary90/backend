import { Router } from "express";
import { addInstance,getCourseByYrSem, getCourseByYrSemId, delInst, allInst } from "../controllers/instance.controller.js";

const InstanceRouter = Router();

InstanceRouter.post('/addInstance', addInstance)

InstanceRouter.get('/getCourseSem/:yr/:sem', getCourseByYrSem)

InstanceRouter.get('/getCourseId/:yr/:sem/:id', getCourseByYrSemId)

InstanceRouter.delete('/delInstance/:yr/:sem/:id', delInst)

InstanceRouter.get('/allInstance/:id', allInst)



export default InstanceRouter