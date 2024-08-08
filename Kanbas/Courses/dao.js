import courseModel from "./model.js";
export function findAllCourses() {
  return courseModel.find();
}
export function createCourse(course) {
  delete course._id;
  return courseModel.create(course);
}
export function findCoursesByAuthor(author) {
  return courseModel.find({ author });
}

export const updateCourse = async (cid,course ) =>
  await courseModel.updateOne({ id: cid }, { $set: course });

export const deleteCourse = async(cid) => 
  await courseModel.findByIdAndDelete(cid);

export function findCoursesByIds(ids) {
    return courseModel.find({ id: { $in: ids } });
  };
