import { type User, type InsertUser } from "@shared/schema";
import { User as UserModel } from "./models/User";
import connectMongoDB from "./db/mongodb";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: Omit<InsertUser, 'confirmPassword'>): Promise<User>;
  updateUserLastLogin(id: string): Promise<void>;
}

export class MongoStorage implements IStorage {
  constructor() {
    // Ensure MongoDB connection is established
    connectMongoDB().catch(console.error);
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      await connectMongoDB();
      
      // Check if id is a valid MongoDB ObjectId
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return undefined; // Invalid ObjectId format
      }
      
      const user = await UserModel.findById(id).lean();
      if (!user) return undefined;
      
      return {
        _id: user._id.toString(),
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      };
    } catch (error) {
      console.error('Error getting user by id:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      await connectMongoDB();
      const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();
      if (!user) return undefined;
      
      return {
        _id: user._id.toString(),
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      };
    } catch (error) {
      console.error('Error getting user by email:', error);
      return undefined;
    }
  }

  async createUser(insertUser: Omit<InsertUser, 'confirmPassword'>): Promise<User> {
    try {
      await connectMongoDB();
      const newUser = new UserModel({
        email: insertUser.email.toLowerCase(),
        password: insertUser.password,
        firstName: insertUser.firstName,
        lastName: insertUser.lastName,
      });
      
      const savedUser = await newUser.save();
      
      return {
        _id: savedUser._id.toString(),
        email: savedUser.email,
        password: savedUser.password,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        createdAt: savedUser.createdAt,
        lastLogin: savedUser.lastLogin,
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUserLastLogin(id: string): Promise<void> {
    try {
      await connectMongoDB();
      await UserModel.findByIdAndUpdate(id, { lastLogin: new Date() });
    } catch (error) {
      console.error('Error updating last login:', error);
      throw error;
    }
  }
}

export const storage = new MongoStorage();
