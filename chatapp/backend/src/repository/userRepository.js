import 'dotenv/config';
import User from '../models/user.js';

export class UserRepository {
  static findUserById = async (userId) => {
    const user = await User.findById(userId);
    return user;
  };

  static findUserByUsername = async (userName) => {
    const user = await User.findOne({ username: userName });
    return user;
  };

  static createUser = async (userInput) => {
    const user = await User.create(userInput);
    console.log('user====', user);
    return user;
  };
}
