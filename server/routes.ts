import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertHackathonSchema,
  insertProblemStatementSchema,
  insertTeamSchema,
  insertTeamMemberSchema,
  insertRegistrationSchema,
  insertSubmissionSchema,
  insertScoreSchema,
  insertAnnouncementSchema,
  insertCertificateSchema,
  insertUserProfileSchema,
  insertJudgeAssignmentSchema,
  insertMentorAssignmentSchema,
} from "@shared/schema";
import { z } from "zod";

function requireAuth(req: Request, res: Response, next: Function) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function requireRole(...roles: string[]) {
  return async (req: Request, res: Response, next: Function) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const profile = await storage.getProfile((req.user as any).id);
    if (!profile || !roles.includes(profile.role || "participant")) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ==========================
  // PUBLIC ROUTES
  // ==========================

  // Get all published hackathons
  app.get("/api/hackathons", async (req, res) => {
    try {
      const { status, category, level, mode, search, featured } = req.query;
      const hackathons = await storage.getHackathons({
        status: status as string,
        category: category as string,
        level: level as string,
        mode: mode as string,
        search: search as string,
        featured: featured === "true",
      });
      res.json(hackathons);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single hackathon by ID or slug
  app.get("/api/hackathons/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      let hackathon = await storage.getHackathon(idOrSlug);
      if (!hackathon) {
        hackathon = await storage.getHackathonBySlug(idOrSlug);
      }
      if (!hackathon) {
        return res.status(404).json({ error: "Hackathon not found" });
      }
      res.json(hackathon);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get problem statements for a hackathon
  app.get("/api/hackathons/:hackathonId/problem-statements", async (req, res) => {
    try {
      const statements = await storage.getProblemStatements(req.params.hackathonId);
      res.json(statements);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get leaderboard for a hackathon
  app.get("/api/hackathons/:hackathonId/leaderboard", async (req, res) => {
    try {
      const entries = await storage.getLeaderboard(req.params.hackathonId);
      res.json(entries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get announcements for a hackathon
  app.get("/api/hackathons/:hackathonId/announcements", async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements(req.params.hackathonId);
      res.json(announcements);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Verify certificate
  app.get("/api/certificates/verify/:code", async (req, res) => {
    try {
      const certificate = await storage.getCertificateByCode(req.params.code);
      if (!certificate) {
        return res.status(404).json({ error: "Certificate not found" });
      }
      res.json(certificate);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==========================
  // USER PROFILE ROUTES
  // ==========================

  // Get current user profile
  app.get("/api/profile", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      let profile = await storage.getProfile(userId);
      if (!profile) {
        profile = await storage.createProfile({
          userId,
          role: "participant",
        });
      }
      res.json(profile);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update current user profile
  app.patch("/api/profile", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const data = insertUserProfileSchema.partial().parse(req.body);
      let profile = await storage.getProfile(userId);
      if (!profile) {
        profile = await storage.createProfile({ userId, ...data });
      } else {
        profile = await storage.updateProfile(userId, data);
      }
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ==========================
  // PARTICIPANT ROUTES
  // ==========================

  // Get user's registrations
  app.get("/api/my/registrations", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const registrations = await storage.getUserRegistrations(userId);
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get user's teams
  app.get("/api/my/teams", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const teams = await storage.getUserTeams(userId);
      res.json(teams);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get user's certificates
  app.get("/api/my/certificates", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const certificates = await storage.getCertificates(userId);
      res.json(certificates);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Register for a hackathon
  app.post("/api/hackathons/:hackathonId/register", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const { hackathonId } = req.params;

      const existing = await storage.getRegistration(hackathonId, userId);
      if (existing) {
        return res.status(400).json({ error: "Already registered" });
      }

      const registration = await storage.createRegistration({
        hackathonId,
        userId,
        status: "registered",
      });
      res.status(201).json(registration);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ==========================
  // TEAM ROUTES
  // ==========================

  // Get teams for a hackathon (looking for members)
  app.get("/api/hackathons/:hackathonId/teams", async (req, res) => {
    try {
      const teams = await storage.getTeams(req.params.hackathonId);
      res.json(teams.filter(t => t.isLookingForMembers));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create a team
  app.post("/api/hackathons/:hackathonId/teams", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const { hackathonId } = req.params;
      const data = insertTeamSchema.omit({ hackathonId: true, leaderId: true }).parse(req.body);

      const team = await storage.createTeam({
        ...data,
        hackathonId,
        leaderId: userId,
      });
      res.status(201).json(team);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get team details
  app.get("/api/teams/:teamId", requireAuth, async (req, res) => {
    try {
      const team = await storage.getTeam(req.params.teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
      const members = await storage.getTeamMembers(team.id);
      res.json({ ...team, members });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update team
  app.patch("/api/teams/:teamId", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const team = await storage.getTeam(req.params.teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
      if (team.leaderId !== userId) {
        return res.status(403).json({ error: "Only team leader can update" });
      }

      const data = insertTeamSchema.partial().parse(req.body);
      const updated = await storage.updateTeam(req.params.teamId, data);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Join team by invite code
  app.post("/api/teams/join/:inviteCode", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const team = await storage.getTeamByInviteCode(req.params.inviteCode);
      if (!team) {
        return res.status(404).json({ error: "Invalid invite code" });
      }

      const isAlreadyMember = await storage.isUserInTeam(team.id, userId);
      if (isAlreadyMember) {
        return res.status(400).json({ error: "Already a team member" });
      }

      const member = await storage.addTeamMember({
        teamId: team.id,
        userId,
        role: "member",
      });
      res.status(201).json(member);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Leave team
  app.delete("/api/teams/:teamId/leave", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const team = await storage.getTeam(req.params.teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
      if (team.leaderId === userId) {
        return res.status(400).json({ error: "Leader cannot leave. Transfer leadership first." });
      }

      await storage.removeTeamMember(team.id, userId);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Remove team member (leader only)
  app.delete("/api/teams/:teamId/members/:memberId", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const team = await storage.getTeam(req.params.teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
      if (team.leaderId !== userId) {
        return res.status(403).json({ error: "Only leader can remove members" });
      }

      await storage.removeTeamMember(team.id, req.params.memberId);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ==========================
  // SUBMISSION ROUTES
  // ==========================

  // Get submissions for a hackathon
  app.get("/api/hackathons/:hackathonId/submissions", async (req, res) => {
    try {
      const submissions = await storage.getSubmissions(req.params.hackathonId);
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get team submissions
  app.get("/api/teams/:teamId/submissions", requireAuth, async (req, res) => {
    try {
      const submissions = await storage.getTeamSubmissions(req.params.teamId);
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single submission
  app.get("/api/submissions/:id", async (req, res) => {
    try {
      const submission = await storage.getSubmission(req.params.id);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      res.json(submission);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create submission
  app.post("/api/teams/:teamId/submissions", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const team = await storage.getTeam(req.params.teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }

      const isMember = await storage.isUserInTeam(team.id, userId);
      if (!isMember) {
        return res.status(403).json({ error: "Not a team member" });
      }

      const data = insertSubmissionSchema.omit({ teamId: true, hackathonId: true }).parse(req.body);
      const submission = await storage.createSubmission({
        ...data,
        teamId: team.id,
        hackathonId: team.hackathonId,
      });
      res.status(201).json(submission);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update submission
  app.patch("/api/submissions/:id", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const submission = await storage.getSubmission(req.params.id);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }

      const isMember = await storage.isUserInTeam(submission.teamId, userId);
      if (!isMember) {
        return res.status(403).json({ error: "Not a team member" });
      }

      const data = insertSubmissionSchema.partial().parse(req.body);
      const updated = await storage.updateSubmission(req.params.id, data);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Submit submission (mark as submitted)
  app.post("/api/submissions/:id/submit", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const submission = await storage.getSubmission(req.params.id);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }

      const isMember = await storage.isUserInTeam(submission.teamId, userId);
      if (!isMember) {
        return res.status(403).json({ error: "Not a team member" });
      }

      const updated = await storage.updateSubmission(req.params.id, {
        status: "submitted",
        submittedAt: new Date(),
      });
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ==========================
  // JUDGE ROUTES
  // ==========================

  // Get judge's assigned hackathons
  app.get("/api/judge/hackathons", requireAuth, requireRole("judge", "admin"), async (req, res) => {
    try {
      const judgeId = (req.user as any).id;
      const assignments = await storage.getJudgeHackathons(judgeId);
      res.json(assignments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get submissions assigned to judge
  app.get("/api/judge/submissions", requireAuth, requireRole("judge", "admin"), async (req, res) => {
    try {
      const judgeId = (req.user as any).id;
      const { hackathonId } = req.query;
      if (!hackathonId) {
        return res.status(400).json({ error: "hackathonId required" });
      }
      const submissions = await storage.getSubmissions(hackathonId as string);
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get judge's scores
  app.get("/api/judge/scores", requireAuth, requireRole("judge", "admin"), async (req, res) => {
    try {
      const judgeId = (req.user as any).id;
      const scores = await storage.getJudgeScores(judgeId);
      res.json(scores);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create or update score
  app.post("/api/submissions/:submissionId/score", requireAuth, requireRole("judge", "admin"), async (req, res) => {
    try {
      const judgeId = (req.user as any).id;
      const { submissionId } = req.params;
      const data = insertScoreSchema.omit({ submissionId: true, judgeId: true }).parse(req.body);

      const existing = await storage.getScore(submissionId, judgeId);
      if (existing) {
        const updated = await storage.updateScore(existing.id, {
          ...data,
          scoredAt: data.isComplete ? new Date() : undefined,
        });
        res.json(updated);
      } else {
        const score = await storage.createScore({
          ...data,
          submissionId,
          judgeId,
          scoredAt: data.isComplete ? new Date() : undefined,
        });
        res.status(201).json(score);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ==========================
  // ADMIN ROUTES
  // ==========================

  // Create hackathon
  app.post("/api/admin/hackathons", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const data = insertHackathonSchema.parse(req.body);
      const hackathon = await storage.createHackathon({
        ...data,
        createdById: userId,
      });
      res.status(201).json(hackathon);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update hackathon
  app.patch("/api/admin/hackathons/:id", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      const data = insertHackathonSchema.partial().parse(req.body);
      const hackathon = await storage.updateHackathon(req.params.id, data);
      if (!hackathon) {
        return res.status(404).json({ error: "Hackathon not found" });
      }
      res.json(hackathon);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete hackathon
  app.delete("/api/admin/hackathons/:id", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      await storage.deleteHackathon(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Create problem statement
  app.post("/api/admin/hackathons/:hackathonId/problem-statements", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      const { hackathonId } = req.params;
      const data = insertProblemStatementSchema.omit({ hackathonId: true }).parse(req.body);
      const ps = await storage.createProblemStatement({ ...data, hackathonId });
      res.status(201).json(ps);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update problem statement
  app.patch("/api/admin/problem-statements/:id", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      const data = insertProblemStatementSchema.partial().parse(req.body);
      const ps = await storage.updateProblemStatement(req.params.id, data);
      res.json(ps);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Create announcement
  app.post("/api/admin/hackathons/:hackathonId/announcements", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const { hackathonId } = req.params;
      const data = insertAnnouncementSchema.omit({ hackathonId: true, createdById: true }).parse(req.body);
      const announcement = await storage.createAnnouncement({
        ...data,
        hackathonId,
        createdById: userId,
      });
      res.status(201).json(announcement);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete announcement
  app.delete("/api/admin/announcements/:id", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      await storage.deleteAnnouncement(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Assign judge
  app.post("/api/admin/hackathons/:hackathonId/judges", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      const { hackathonId } = req.params;
      const data = insertJudgeAssignmentSchema.omit({ hackathonId: true }).parse(req.body);
      const assignment = await storage.createJudgeAssignment({ ...data, hackathonId });
      res.status(201).json(assignment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Assign mentor
  app.post("/api/admin/hackathons/:hackathonId/mentors", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      const { hackathonId } = req.params;
      const data = insertMentorAssignmentSchema.omit({ hackathonId: true }).parse(req.body);
      const assignment = await storage.createMentorAssignment({ ...data, hackathonId });
      res.status(201).json(assignment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Issue certificate
  app.post("/api/admin/certificates", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      const data = insertCertificateSchema.parse(req.body);
      const certificate = await storage.createCertificate(data);
      res.status(201).json(certificate);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get all registrations for a hackathon
  app.get("/api/admin/hackathons/:hackathonId/registrations", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      const registrations = await storage.getRegistrations(req.params.hackathonId);
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all teams for a hackathon
  app.get("/api/admin/hackathons/:hackathonId/teams", requireAuth, requireRole("admin"), async (req, res) => {
    try {
      const teams = await storage.getTeams(req.params.hackathonId);
      res.json(teams);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==========================
  // MENTOR CHAT ROUTES
  // ==========================

  // Get chat history
  app.get("/api/mentor-chat", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const { hackathonId } = req.query;
      const chats = await storage.getMentorChats(userId, hackathonId as string);
      res.json(chats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Send message (AI response would be integrated here)
  app.post("/api/mentor-chat", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const { message, hackathonId } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message required" });
      }

      // For now, return a placeholder response (AI integration would go here)
      const aiResponse = "I'm your AI mentor assistant. This feature will provide AI-powered guidance for hackathon participants. Integration with LLM coming soon!";

      const chat = await storage.createMentorChat({
        userId,
        hackathonId,
        message,
        response: aiResponse,
      });

      res.status(201).json(chat);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  return httpServer;
}
