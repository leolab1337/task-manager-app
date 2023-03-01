import {ICreateTaskCategory, ITaskCategory, IUpdateTaskCategory} from "./TaskCategory/taskCategory";
import {TaskCategoryModel} from "./TaskCategory/taskCategory.model";
import {ObjectId, Types} from "mongoose";
import {DeleteResult} from "mongodb";
import {TaskService} from "@/task";


export class TaskCategoryService{

    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    getAll = async (page = 1, limit = 10): Promise<ITaskCategory[]> =>{
        try {
            const skipCount = (page - 1) * limit;
            return await TaskCategoryModel.find()
                .populate({
                    path: "user",
                    select: "-password",
                })
                .populate('tasks')
                .skip(skipCount).
                limit(limit).
                exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting all users: ${error.message}`);
            }
            throw new Error(`Error getting all users: ${error}`);
        }
    }

    getAllRelatedToUser = async (userId: ObjectId): Promise<ITaskCategory[]> =>{
        try {
            return await TaskCategoryModel.find({ user: userId }).populate('tasks');
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting all users: ${error.message}`);
            }
            throw new Error(`Error getting all users: ${error}`);
        }
    }

    getById = async (id: ObjectId): Promise<ITaskCategory | null> =>  {

            try {
                return await TaskCategoryModel.findById(id).populate('tasks');
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(`Error getting user by ID: ${error.message}`);
                }
                throw new Error(`Error getting user by ID: ${error}`);
            }
    }

    createNew = async (taskCategoryBody: ICreateTaskCategory): Promise<ITaskCategory> =>{
        try {
            const { taskCategoryName, userId } = taskCategoryBody;

            const newTaskCategory = new TaskCategoryModel<ICreateTaskCategory>({
                taskCategoryName,
                userId,
                //todo check it
                // tasks: []
            });
            return await newTaskCategory.save();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting user by ID: ${error.message}`);
            }
            throw new Error(`Error getting user by ID: ${error}`);
        }
    }


    update = async (taskCategoryBody: IUpdateTaskCategory): Promise<ITaskCategory | null> => {
        try {
            const {taskCategoryName, _id} = taskCategoryBody;

            return await TaskCategoryModel.findByIdAndUpdate(
                _id,
                {taskCategoryName},
                {new: true},
            ).populate('tasks');
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting user by ID: ${error.message}`);
            }
            throw new Error(`Error getting user by ID: ${error}`);
        }
    }

    deleteTaskCategoryById = async (id: ObjectId): Promise<ITaskCategory | null> => {
        try {
            return await TaskCategoryModel.findByIdAndDelete(id).populate('tasks');
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting user by ID: ${error.message}`);
            }
            throw new Error(`Error getting user by ID: ${error}`);
        }
    }


    deleteAllTaskCategoriesAndTasksByUser = async (userId: ObjectId): Promise<DeleteResult> => {
        try {
            // Find all task categories belonging to the user
            // const taskCategories = await TaskCategoryModel.find({ user: userId }).exec();
            const taskCategories = await this.getAllRelatedToUser(userId);

            // Loop through each task category and delete its tasks
            for (const taskCategory of taskCategories) {
                await this.taskService.deleteAllTasksByTaskCategory(taskCategory._id);
            }

            // Delete all task categories belonging to the user
            return await TaskCategoryModel.deleteMany({ user: userId }).exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error deleting task categories: ${error.message}`);
            }
            throw new Error(`Error deleting task categories: ${error}`);
        }
    };



}
