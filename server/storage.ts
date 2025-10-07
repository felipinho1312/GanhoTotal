import { type User, type InsertUser, type Entry, type InsertEntry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Entry methods
  getEntriesByUserId(userId: string): Promise<Entry[]>;
  createEntry(userId: string, entry: InsertEntry): Promise<Entry>;
  deleteEntry(id: string, userId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private entries: Map<string, Entry>;

  constructor() {
    this.users = new Map();
    this.entries = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Entry methods
  async getEntriesByUserId(userId: string): Promise<Entry[]> {
    return Array.from(this.entries.values()).filter(
      (entry) => entry.userId === userId,
    );
  }

  async createEntry(userId: string, insertEntry: InsertEntry): Promise<Entry> {
    const id = randomUUID();
    const entry: Entry = {
      ...insertEntry,
      id,
      userId,
      description: insertEntry.description ?? null,
      createdAt: new Date(),
    };
    this.entries.set(id, entry);
    return entry;
  }

  async deleteEntry(id: string, userId: string): Promise<boolean> {
    const entry = this.entries.get(id);
    if (entry && entry.userId === userId) {
      this.entries.delete(id);
      return true;
    }
    return false;
  }
}

export const storage = new MemStorage();
