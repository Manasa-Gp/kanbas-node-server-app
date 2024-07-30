import Module from './model.js';

export const createModule = async (moduleData) => {
  return await Module.create(moduleData);
};

export const findAllModules = async () => {
  return await Module.find().populate('course');
};

export const findModuleById = async (moduleId) => {
  return await Module.findById(moduleId).populate('course');
};

export const findModulesByCourse = async (courseId) => {
  try {
    return await Module.find({ course: courseId }).populate('course');
  } catch (error) {
    console.error("Error fetching modules by course:", error);
    throw error;
  }
};

export const updateModule = async (moduleId, moduleData) => {
  return await Module.updateOne({ _id: moduleId }, { $set: moduleData });

};

export const deleteModule = (moduleId) => Module.deleteOne({ _id: moduleId });