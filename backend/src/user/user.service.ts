import {ICreateUser, IUpdateUser, IUser} from "./User/user";
import {UserModel} from "./User/user.model";
import {DeleteResult, MongoError} from "mongodb";
import {TaskCategoryService} from "@/taskCategory";
import {TaskService} from "@/task";
import {ObjectId, Schema} from "mongoose";


export class UserService {

    private taskCategoryService: TaskCategoryService;

    constructor() {
        this.taskCategoryService = new TaskCategoryService(new TaskService());
    }

    getByUserName = async (username: string): Promise<IUser | null> =>  {
        try {
            return await UserModel.findOne({username})
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting user by username: ${error.message}`);
            }
            throw new Error(`Error getting user by username: ${error}`);
        }
    }


   getById = async (id: string): Promise<IUser | null> =>  {

    try {
      return await UserModel.findById(id).populate('tasks').populate('taskCategories');
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error getting user by ID: ${error.message}`);
      }
      throw new Error(`Error getting user by ID: ${error}`);
    }
  }

  getAll = async (page = 1, limit = 10): Promise<IUser[]> =>{
    try {
      const skipCount = (page - 1) * limit;
      return await UserModel.find().skip(skipCount).limit(limit).exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error getting all users: ${error.message}`);
      }
      throw new Error(`Error getting all users: ${error}`);
    }
  }

   createNew = async (userBody: ICreateUser): Promise<IUser | MongoError> =>{
    try {
      const { username, password } = userBody;

      const newUser = new UserModel<ICreateUser>({
        username,
        password
      });
      return await newUser.save();
    } catch (error) {
      if (error instanceof MongoError) {
        return error;
      }
      throw new Error(`Error saving user data: ${error}`);
    }
  }

   updateUser = async (userBody: IUpdateUser): Promise<IUser | null> =>{
    try {
      const { _id, username, password, role } = userBody;
      return await UserModel.findByIdAndUpdate(_id, { username, password ,role }, { new: true }).exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error updating user: ${error.message}`);
      }
      throw new Error(`Error updating user: ${error}`);
    }
  }

   deleteUser = async (userId: string): Promise<(IUser & Required<{ _id: Schema.Types.ObjectId }>) | null> => {
    try {
        const result = await UserModel.findByIdAndDelete(userId).exec();
        await this.taskCategoryService.deleteAllTaskCategoriesAndTasksByUser(userId);
        return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error deleting user: ${error.message}`);
      }
      throw new Error(`Error deleting user: ${error}`);
    }
  }
}

