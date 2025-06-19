import { Router } from "express";
import { addCourse, allCourses, findCourse, delCourse } from "../controllers/course.controller.js"; 

const CourseRouter = Router();



CourseRouter.post('/addCourse', addCourse)

CourseRouter.get('/allCourses', allCourses)

CourseRouter.get('/course/:id', findCourse)

CourseRouter.delete('/delCourse/:id', delCourse)


export default CourseRouter

