// logic for filtering users and performing operations is done here
import model from "./model.js";
export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};

export const findAllUsers = () => model.find();

export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};

export const findUserById = (userId) => model.findById(userId).exec();

export const findUserByUsername = (username) =>
  model.findOne({ username: username });

export const findUserByCredentials = (username, password) =>
  model.findOne({ username: username, password });

export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const getUserEnrollmentsById = async (username) => {
  try {
    const user = await model.findOne(username, 'enrollment').exec();
    return user ? user.enrollment : null;
  } catch (error) {
    console.error('Error retrieving user enrollments by ID:', error);
    throw error;
  }
};

export const updateUserEnrollments = async (username, courseId) => {
  try {
    console.log("dao user");
    const user = await model.findOne({ username });
    if (!user) return { error: 'User not found' };

    if (user.enrollment.includes(courseId)) {
      return { error: 'Already enrolled in this course' };
    }
    console.log("dao");


    user.enrollment.push(courseId);
    await user.save();
    return { message: 'Successfully enrolled in course' };
  } catch (error) {
    console.error('Error updating user enrollments:', error);
    return { error: 'Failed to enroll in course' };
  }
};
