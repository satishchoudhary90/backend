import { Course } from "../db/models/course.model.js";
import { CourseInstance } from "../db/models/courseInstance.model.js";

export const addInstance = async (req, res) => {
  try {
    const { course, year, semester } = req.body;

    if (!course || !year || !semester) throw new Error("Details not provided");

    const courseIdDocs = await Course.find({}, { course_id: 1 });
    const courseIds = courseIdDocs.map((doc) => doc.course_id);

    if (!courseIds.includes(course))
      throw new Error("Course not available to create instance");

    const instance = new CourseInstance({
      course,
      year,
      semester,
    });
    const newInstance = await instance.save();

    if (!newInstance) throw new Error("Instance not created");

    res.status(200).json({msg: "Instance Added Successfully",newInstance});
  } catch (error) {
    console.log("Error Occurred in addInstance controller ", error.message);
    res.status(500).json({ msg: error.message });
  }
};
export const getCourseByYrSem = async (req, res) => {
  try {
    const { yr, sem } = req.params;
    if (!yr || !sem) throw new Error("Details not provided");

    const courseInstanceIds = await CourseInstance.find({
      year: parseInt(yr),
      semester: parseInt(sem),
    }).select("course");

    const courseIds = courseInstanceIds.map((instance) => instance.course);

    const courses = await Course.find({
      course_id: { $in: courseIds },
    });

    res.status(200).json(courses);
  } catch (error) {
    console.log("Error in CourseIntanceIds Controller : ", error.message);
    res.status(500).json({ msg: `${error.message}` });
  }
};
export const getCourseByYrSemId = async (req, res) => {
  try {
    const { yr, sem, id } = req.params;

    if (!yr || !sem) throw new Error("Details not provided");

    const courseInstanceIds = await CourseInstance.find({
      year: parseInt(yr),
      semester: parseInt(sem),
    }).select("course");

    const courseIds = courseInstanceIds.map((instance) => instance.course);

    const courses = await Course.find({
      course_id: { $in: courseIds },
    });

    const courseById = courses.filter((course) => course.course_id === id);

    res.status(200).json(courseById);
  } catch (error) {
    console.log("Error : ", error.message);
    res.json({ msg: error.message });
  }
};
export const delInst = async (req, res) => {
  try {
    const { yr, sem, id } = req.params;

    if (!yr || !sem || !id) throw new Error("Details not provided");

    const course = await Course.findOne({ course_id: id });
    if (!course) throw new Error("Course not found");

    const deletedInstance = await CourseInstance.deleteOne({
      year: parseInt(yr),
      semester: parseInt(sem),
      course: course.course_id,
    });

    if (deletedInstance.deletedCount === 0) {
      throw new Error("Course instance not available to delete");
    }

    res.status(200).json({ msg: "Instance Deleted Successfully" });
  } catch (error) {
    console.log("Error in delInst in Controller:", error.message);
    res.status(500).json({ msg: error.message });
  }
};
export const allInst = async (req,res) => {
  try {
     const {id} = req.params;

     if(!id) throw new Error("CourseId Not Provided");
        
     const instances = await CourseInstance.find({course: id});
     
     if(!instances) throw new Error('No intances available');

     res.status(200).json(instances);
  } catch (error) {
    console.log('Error in allInst controller: ',error.message);
    res.status(500).json({msg:error.message});
  }
};

