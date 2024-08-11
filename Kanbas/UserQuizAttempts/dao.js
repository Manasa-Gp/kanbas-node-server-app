import attemptmodel from './model.js'; // Import the model from schema.js
import mongoose from 'mongoose';

/**
 * Create a new quiz attempt.
 * @param {String} username - The username of the user.
 * @param {String} course - The course identifier.
 * @param {mongoose.Types.ObjectId} quiz - The quiz identifier.
 * @returns {Promise<Object>} - The created quiz attempt document.
 */
export const createQuizAttempt = async (quizAttempt) => {
    try {
      delete quizAttempt._id;
      // Use the create method to save the new quiz attempt document
      const newAttempt = await attemptmodel.create(quizAttempt);
  
      return newAttempt;
    } catch (error) {
      throw new Error(`Error creating attempt: ${error.message}`);
    }
  };


  export const updateAttempts = async (qaid, attempts,number) => {
    try {
      console.log("quizAttempt update dao", qaid,attempts);
      const updatedAttempt = await attemptmodel.findByIdAndUpdate(
        qaid,
        { $set: { attempts,number } },
            );
      console.log("quizAttempt update dao", updatedAttempt);

  
      if (!updatedAttempt) {
        throw new Error('Attempt not found');
      }
  
      return updatedAttempt;
    } catch (error) {
      throw new Error(`Error updating attempts: ${error.message}`);
    }
  };
/** 
* Retrieve a quiz attempt by username, course, and quiz ID.
* @param {String} username - The username of the user.
* @param {String} course - The course identifier.
* @param {mongoose.Types.ObjectId} quiz - The quiz identifier.
* @returns {Promise<Object>} - The quiz attempt document.
*/
export const getQuizAttempt = async (usernames, course, quiz) => {
   try {

       const quizAttempt = await attemptmodel.findOne({ username: usernames, course: course, quiz: quiz });
       console.log("quizAttempt get dao_x", quizAttempt);
       if (!quizAttempt) {
           throw new Error('Quiz Attempt not found');
       }
       console.log("quizAttempt get dao_", quizAttempt);
       return quizAttempt;
   } catch (error) {
       throw new Error(`Error retrieving quiz attempt: ${error.message}`);
   }
};