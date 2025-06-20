import { Course } from "../db/models/course.model.js";

export const addCourse = async (req, res) => {
  try {
    const { title, description, prerequisites } = req.body;
    if (!title || !description || !prerequisites) {
      throw Error("Course Details Not Found");
    }
    const course_ids_docs = await Course.find(
      {},
      { course_id: 1, _id: 0 }
    ).lean();
    const course_ids = course_ids_docs.map((doc) => doc.course_id);
    if (prerequisites.length > 0) {
      prerequisites.forEach((pre) => {
        if (!course_ids.includes(pre)) {
          throw Error("Prerequisites Not Matched");
        }
      });
    }
    const course_id = `CS-${Math.floor(Math.random() * 1000)}`;
    const course = new Course({
      course_id,
      title,
      description,
      prerequisites,
    });
    const newCourse = await course.save();
    res.status(201).json({ msg: "Course Successfully Created", newCourse });
  } catch (error) {
    console.log("Error in addCourse Controller : ", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const allCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      throw Error("Courses not Available");
    }
    res.status(200).json(courses);
  } catch (error) {
    console.log("Error in allCourses Controller: ", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const findCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("Course id not provided");

    // Step 1: Get the main course
    const course = await Course.findOne({ course_id: id }).lean();

    if (!course) throw new Error("Course not found");

    // Step 2: Manually find prerequisite course documents
    const prerequisites = await Course.find({
      course_id: { $in: course.prerequisites },
    }).lean();

    // Step 3: Attach them to the response
    course.prerequisites_details = prerequisites;

    res.status(200).json(course);
  } catch (error) {
    console.error("Error in findCourse controller:", error.message);
    res.status(400).json({ msg: error.message || "Internal Server Error" });
  }
};

export const delCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Course ID is required");
    }
    const allPrerequisiteIds = await Course.aggregate([
      { $unwind: "$prerequisites" },
      { $group: { _id: null, prerequisites: { $addToSet: "$prerequisites" } } },
      { $project: { _id: 0, prerequisites: 1 } },
    ]);

    const prerequisiteIds = allPrerequisiteIds[0]?.prerequisites || [];
    if (prerequisiteIds.includes(id)) {
      throw new Error("Cannot delete: course is a prerequisite for another.");
    }

    const result = await Course.deleteOne({ course_id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Course not found" });
    }

    res.status(200).json({ msg: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error.message);
    res.status(409).json({ msg: error.message });
  }
};
