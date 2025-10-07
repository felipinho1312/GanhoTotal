import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertEntrySchema } from "@shared/schema";
import { z } from "zod";
import "./types";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register new user
  app.post("/api/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      // Create user
      const user = await storage.createUser(data);
      
      // Set session
      req.session.userId = user.id;
      
      res.json({ id: user.id, email: user.email });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Dados inválidos", details: error.errors });
      }
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  });

  // Login
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Email ou senha incorretos" });
      }

      // Set session
      req.session.userId = user.id;
      
      res.json({ id: user.id, email: user.email });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  });

  // Logout
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao fazer logout" });
      }
      res.json({ success: true });
    });
  });

  // Check if user is authenticated
  app.get("/api/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ id: user.id, email: user.email });
  });

  // Get all entries for logged user
  app.get("/api/entries", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    try {
      const entries = await storage.getEntriesByUserId(req.session.userId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar registros" });
    }
  });

  // Create new entry
  app.post("/api/entries", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    try {
      const data = insertEntrySchema.parse(req.body);
      const entry = await storage.createEntry(req.session.userId, data);
      res.json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Dados inválidos", details: error.errors });
      }
      res.status(500).json({ error: "Erro ao criar registro" });
    }
  });

  // Delete entry
  app.delete("/api/entries/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    try {
      const deleted = await storage.deleteEntry(req.params.id, req.session.userId);
      if (!deleted) {
        return res.status(404).json({ error: "Registro não encontrado" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar registro" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
