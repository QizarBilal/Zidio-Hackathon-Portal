import { eq, and, desc, asc, sql, ilike, or } from "drizzle-orm";
import { db } from "./db";
import {
  type User, type InsertUser,
  type UserProfile, type InsertUserProfile, userProfiles,
  type Hackathon, type InsertHackathon, hackathons,
  type ProblemStatement, type InsertProblemStatement, problemStatements,
  type Team, type InsertTeam, teams,
  type TeamMember, type InsertTeamMember, teamMembers,
  type Registration, type InsertRegistration, registrations,
  type Submission, type InsertSubmission, submissions,
  type Score, type InsertScore, scores,
  type JudgeAssignment, type InsertJudgeAssignment, judgeAssignments,
  type MentorAssignment, type InsertMentorAssignment, mentorAssignments,
  type Announcement, type InsertAnnouncement, announcements,
  type Certificate, type InsertCertificate, certificates,
  type LeaderboardEntry, type InsertLeaderboardEntry, leaderboardEntries,
  type MentorChat, type InsertMentorChat, mentorChats,
} from "@shared/schema";
import { randomUUID } from "crypto";

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateVerificationCode(): string {
  return `ZH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

export interface IStorage {
  // User Profiles
  getProfile(userId: string): Promise<UserProfile | undefined>;
  createProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;

  // Hackathons
  getHackathons(filters?: { status?: string; category?: string; level?: string; mode?: string; search?: string; featured?: boolean }): Promise<Hackathon[]>;
  getHackathon(id: string): Promise<Hackathon | undefined>;
  getHackathonBySlug(slug: string): Promise<Hackathon | undefined>;
  createHackathon(hackathon: InsertHackathon): Promise<Hackathon>;
  updateHackathon(id: string, hackathon: Partial<InsertHackathon>): Promise<Hackathon | undefined>;
  deleteHackathon(id: string): Promise<boolean>;

  // Problem Statements
  getProblemStatements(hackathonId: string): Promise<ProblemStatement[]>;
  getProblemStatement(id: string): Promise<ProblemStatement | undefined>;
  createProblemStatement(ps: InsertProblemStatement): Promise<ProblemStatement>;
  updateProblemStatement(id: string, ps: Partial<InsertProblemStatement>): Promise<ProblemStatement | undefined>;
  deleteProblemStatement(id: string): Promise<boolean>;

  // Teams
  getTeams(hackathonId: string): Promise<Team[]>;
  getTeam(id: string): Promise<Team | undefined>;
  getTeamByInviteCode(code: string): Promise<Team | undefined>;
  getUserTeams(userId: string): Promise<Team[]>;
  createTeam(team: InsertTeam): Promise<Team>;
  updateTeam(id: string, team: Partial<InsertTeam>): Promise<Team | undefined>;
  deleteTeam(id: string): Promise<boolean>;

  // Team Members
  getTeamMembers(teamId: string): Promise<TeamMember[]>;
  addTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  removeTeamMember(teamId: string, userId: string): Promise<boolean>;
  isUserInTeam(teamId: string, userId: string): Promise<boolean>;

  // Registrations
  getRegistrations(hackathonId: string): Promise<Registration[]>;
  getUserRegistrations(userId: string): Promise<Registration[]>;
  getRegistration(hackathonId: string, userId: string): Promise<Registration | undefined>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  updateRegistration(id: string, registration: Partial<InsertRegistration>): Promise<Registration | undefined>;

  // Submissions
  getSubmissions(hackathonId: string): Promise<Submission[]>;
  getTeamSubmissions(teamId: string): Promise<Submission[]>;
  getSubmission(id: string): Promise<Submission | undefined>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  updateSubmission(id: string, submission: Partial<InsertSubmission>): Promise<Submission | undefined>;

  // Scores
  getSubmissionScores(submissionId: string): Promise<Score[]>;
  getJudgeScores(judgeId: string): Promise<Score[]>;
  getScore(submissionId: string, judgeId: string): Promise<Score | undefined>;
  createScore(score: InsertScore): Promise<Score>;
  updateScore(id: string, score: Partial<InsertScore>): Promise<Score | undefined>;

  // Judge/Mentor Assignments
  getJudgeAssignments(hackathonId: string): Promise<JudgeAssignment[]>;
  getJudgeHackathons(judgeId: string): Promise<JudgeAssignment[]>;
  createJudgeAssignment(assignment: InsertJudgeAssignment): Promise<JudgeAssignment>;
  getMentorAssignments(hackathonId: string): Promise<MentorAssignment[]>;
  getMentorHackathons(mentorId: string): Promise<MentorAssignment[]>;
  createMentorAssignment(assignment: InsertMentorAssignment): Promise<MentorAssignment>;

  // Announcements
  getAnnouncements(hackathonId: string): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: string, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined>;
  deleteAnnouncement(id: string): Promise<boolean>;

  // Certificates
  getCertificates(userId: string): Promise<Certificate[]>;
  getHackathonCertificates(hackathonId: string): Promise<Certificate[]>;
  getCertificateByCode(code: string): Promise<Certificate | undefined>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;

  // Leaderboard
  getLeaderboard(hackathonId: string): Promise<LeaderboardEntry[]>;
  updateLeaderboardEntry(hackathonId: string, teamId: string, score: number): Promise<LeaderboardEntry>;

  // Mentor Chat
  getMentorChats(userId: string, hackathonId?: string): Promise<MentorChat[]>;
  createMentorChat(chat: InsertMentorChat): Promise<MentorChat>;
}

export class DatabaseStorage implements IStorage {
  // User Profiles
  async getProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
    return profile;
  }

  async createProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [created] = await db.insert(userProfiles).values(profile).returning();
    return created;
  }

  async updateProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const [updated] = await db.update(userProfiles)
      .set({ ...profile, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId))
      .returning();
    return updated;
  }

  // Hackathons
  async getHackathons(filters?: { status?: string; category?: string; level?: string; mode?: string; search?: string; featured?: boolean }): Promise<Hackathon[]> {
    let query = db.select().from(hackathons);
    const conditions = [];

    if (filters?.status && filters.status !== "all") {
      conditions.push(eq(hackathons.status, filters.status));
    }
    if (filters?.category && filters.category !== "All Categories") {
      conditions.push(eq(hackathons.category, filters.category));
    }
    if (filters?.level && filters.level !== "all") {
      conditions.push(eq(hackathons.level, filters.level));
    }
    if (filters?.mode && filters.mode !== "all") {
      conditions.push(eq(hackathons.mode, filters.mode));
    }
    if (filters?.featured) {
      conditions.push(eq(hackathons.isFeatured, true));
    }
    if (filters?.search) {
      conditions.push(
        or(
          ilike(hackathons.title, `%${filters.search}%`),
          ilike(hackathons.description, `%${filters.search}%`)
        )
      );
    }
    conditions.push(eq(hackathons.isPublished, true));

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    return query.orderBy(desc(hackathons.isFeatured), desc(hackathons.createdAt));
  }

  async getHackathon(id: string): Promise<Hackathon | undefined> {
    const [hackathon] = await db.select().from(hackathons).where(eq(hackathons.id, id));
    return hackathon;
  }

  async getHackathonBySlug(slug: string): Promise<Hackathon | undefined> {
    const [hackathon] = await db.select().from(hackathons).where(eq(hackathons.slug, slug));
    return hackathon;
  }

  async createHackathon(hackathon: InsertHackathon): Promise<Hackathon> {
    const [created] = await db.insert(hackathons).values(hackathon).returning();
    return created;
  }

  async updateHackathon(id: string, hackathon: Partial<InsertHackathon>): Promise<Hackathon | undefined> {
    const [updated] = await db.update(hackathons)
      .set({ ...hackathon, updatedAt: new Date() })
      .where(eq(hackathons.id, id))
      .returning();
    return updated;
  }

  async deleteHackathon(id: string): Promise<boolean> {
    const result = await db.delete(hackathons).where(eq(hackathons.id, id));
    return true;
  }

  // Problem Statements
  async getProblemStatements(hackathonId: string): Promise<ProblemStatement[]> {
    return db.select().from(problemStatements)
      .where(and(eq(problemStatements.hackathonId, hackathonId), eq(problemStatements.isActive, true)))
      .orderBy(asc(problemStatements.order));
  }

  async getProblemStatement(id: string): Promise<ProblemStatement | undefined> {
    const [ps] = await db.select().from(problemStatements).where(eq(problemStatements.id, id));
    return ps;
  }

  async createProblemStatement(ps: InsertProblemStatement): Promise<ProblemStatement> {
    const [created] = await db.insert(problemStatements).values(ps).returning();
    return created;
  }

  async updateProblemStatement(id: string, ps: Partial<InsertProblemStatement>): Promise<ProblemStatement | undefined> {
    const [updated] = await db.update(problemStatements).set(ps).where(eq(problemStatements.id, id)).returning();
    return updated;
  }

  async deleteProblemStatement(id: string): Promise<boolean> {
    await db.update(problemStatements).set({ isActive: false }).where(eq(problemStatements.id, id));
    return true;
  }

  // Teams
  async getTeams(hackathonId: string): Promise<Team[]> {
    return db.select().from(teams).where(eq(teams.hackathonId, hackathonId));
  }

  async getTeam(id: string): Promise<Team | undefined> {
    const [team] = await db.select().from(teams).where(eq(teams.id, id));
    return team;
  }

  async getTeamByInviteCode(code: string): Promise<Team | undefined> {
    const [team] = await db.select().from(teams).where(eq(teams.inviteCode, code));
    return team;
  }

  async getUserTeams(userId: string): Promise<Team[]> {
    const members = await db.select().from(teamMembers).where(eq(teamMembers.userId, userId));
    if (members.length === 0) return [];
    
    const teamIds = members.map(m => m.teamId);
    return db.select().from(teams).where(sql`${teams.id} = ANY(${teamIds})`);
  }

  async createTeam(team: InsertTeam): Promise<Team> {
    const inviteCode = generateInviteCode();
    const [created] = await db.insert(teams).values({ ...team, inviteCode }).returning();
    
    // Add leader as team member
    await db.insert(teamMembers).values({
      teamId: created.id,
      userId: team.leaderId,
      role: "leader",
    });
    
    return created;
  }

  async updateTeam(id: string, team: Partial<InsertTeam>): Promise<Team | undefined> {
    const [updated] = await db.update(teams)
      .set({ ...team, updatedAt: new Date() })
      .where(eq(teams.id, id))
      .returning();
    return updated;
  }

  async deleteTeam(id: string): Promise<boolean> {
    await db.delete(teamMembers).where(eq(teamMembers.teamId, id));
    await db.delete(teams).where(eq(teams.id, id));
    return true;
  }

  // Team Members
  async getTeamMembers(teamId: string): Promise<TeamMember[]> {
    return db.select().from(teamMembers).where(eq(teamMembers.teamId, teamId));
  }

  async addTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [created] = await db.insert(teamMembers).values(member).returning();
    return created;
  }

  async removeTeamMember(teamId: string, userId: string): Promise<boolean> {
    await db.delete(teamMembers).where(and(eq(teamMembers.teamId, teamId), eq(teamMembers.userId, userId)));
    return true;
  }

  async isUserInTeam(teamId: string, userId: string): Promise<boolean> {
    const [member] = await db.select().from(teamMembers)
      .where(and(eq(teamMembers.teamId, teamId), eq(teamMembers.userId, userId)));
    return !!member;
  }

  // Registrations
  async getRegistrations(hackathonId: string): Promise<Registration[]> {
    return db.select().from(registrations).where(eq(registrations.hackathonId, hackathonId));
  }

  async getUserRegistrations(userId: string): Promise<Registration[]> {
    return db.select().from(registrations).where(eq(registrations.userId, userId));
  }

  async getRegistration(hackathonId: string, userId: string): Promise<Registration | undefined> {
    const [reg] = await db.select().from(registrations)
      .where(and(eq(registrations.hackathonId, hackathonId), eq(registrations.userId, userId)));
    return reg;
  }

  async createRegistration(registration: InsertRegistration): Promise<Registration> {
    const [created] = await db.insert(registrations).values(registration).returning();
    return created;
  }

  async updateRegistration(id: string, registration: Partial<InsertRegistration>): Promise<Registration | undefined> {
    const [updated] = await db.update(registrations).set(registration).where(eq(registrations.id, id)).returning();
    return updated;
  }

  // Submissions
  async getSubmissions(hackathonId: string): Promise<Submission[]> {
    return db.select().from(submissions)
      .where(eq(submissions.hackathonId, hackathonId))
      .orderBy(desc(submissions.submittedAt));
  }

  async getTeamSubmissions(teamId: string): Promise<Submission[]> {
    return db.select().from(submissions).where(eq(submissions.teamId, teamId)).orderBy(desc(submissions.createdAt));
  }

  async getSubmission(id: string): Promise<Submission | undefined> {
    const [sub] = await db.select().from(submissions).where(eq(submissions.id, id));
    return sub;
  }

  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const [created] = await db.insert(submissions).values(submission).returning();
    return created;
  }

  async updateSubmission(id: string, submission: Partial<InsertSubmission>): Promise<Submission | undefined> {
    const [updated] = await db.update(submissions)
      .set({ ...submission, updatedAt: new Date() })
      .where(eq(submissions.id, id))
      .returning();
    return updated;
  }

  // Scores
  async getSubmissionScores(submissionId: string): Promise<Score[]> {
    return db.select().from(scores).where(eq(scores.submissionId, submissionId));
  }

  async getJudgeScores(judgeId: string): Promise<Score[]> {
    return db.select().from(scores).where(eq(scores.judgeId, judgeId));
  }

  async getScore(submissionId: string, judgeId: string): Promise<Score | undefined> {
    const [score] = await db.select().from(scores)
      .where(and(eq(scores.submissionId, submissionId), eq(scores.judgeId, judgeId)));
    return score;
  }

  async createScore(score: InsertScore): Promise<Score> {
    const [created] = await db.insert(scores).values(score).returning();
    return created;
  }

  async updateScore(id: string, score: Partial<InsertScore>): Promise<Score | undefined> {
    const [updated] = await db.update(scores).set(score).where(eq(scores.id, id)).returning();
    return updated;
  }

  // Judge/Mentor Assignments
  async getJudgeAssignments(hackathonId: string): Promise<JudgeAssignment[]> {
    return db.select().from(judgeAssignments).where(eq(judgeAssignments.hackathonId, hackathonId));
  }

  async getJudgeHackathons(judgeId: string): Promise<JudgeAssignment[]> {
    return db.select().from(judgeAssignments).where(eq(judgeAssignments.judgeId, judgeId));
  }

  async createJudgeAssignment(assignment: InsertJudgeAssignment): Promise<JudgeAssignment> {
    const [created] = await db.insert(judgeAssignments).values(assignment).returning();
    return created;
  }

  async getMentorAssignments(hackathonId: string): Promise<MentorAssignment[]> {
    return db.select().from(mentorAssignments).where(eq(mentorAssignments.hackathonId, hackathonId));
  }

  async getMentorHackathons(mentorId: string): Promise<MentorAssignment[]> {
    return db.select().from(mentorAssignments).where(eq(mentorAssignments.mentorId, mentorId));
  }

  async createMentorAssignment(assignment: InsertMentorAssignment): Promise<MentorAssignment> {
    const [created] = await db.insert(mentorAssignments).values(assignment).returning();
    return created;
  }

  // Announcements
  async getAnnouncements(hackathonId: string): Promise<Announcement[]> {
    return db.select().from(announcements)
      .where(and(eq(announcements.hackathonId, hackathonId), eq(announcements.isPublished, true)))
      .orderBy(desc(announcements.publishedAt));
  }

  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const [created] = await db.insert(announcements).values(announcement).returning();
    return created;
  }

  async updateAnnouncement(id: string, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const [updated] = await db.update(announcements).set(announcement).where(eq(announcements.id, id)).returning();
    return updated;
  }

  async deleteAnnouncement(id: string): Promise<boolean> {
    await db.delete(announcements).where(eq(announcements.id, id));
    return true;
  }

  // Certificates
  async getCertificates(userId: string): Promise<Certificate[]> {
    return db.select().from(certificates).where(eq(certificates.userId, userId));
  }

  async getHackathonCertificates(hackathonId: string): Promise<Certificate[]> {
    return db.select().from(certificates).where(eq(certificates.hackathonId, hackathonId));
  }

  async getCertificateByCode(code: string): Promise<Certificate | undefined> {
    const [cert] = await db.select().from(certificates).where(eq(certificates.verificationCode, code));
    return cert;
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const verificationCode = generateVerificationCode();
    const [created] = await db.insert(certificates).values({ ...certificate, verificationCode }).returning();
    return created;
  }

  // Leaderboard
  async getLeaderboard(hackathonId: string): Promise<LeaderboardEntry[]> {
    return db.select().from(leaderboardEntries)
      .where(eq(leaderboardEntries.hackathonId, hackathonId))
      .orderBy(asc(leaderboardEntries.rank));
  }

  async updateLeaderboardEntry(hackathonId: string, teamId: string, totalScore: number): Promise<LeaderboardEntry> {
    const [existing] = await db.select().from(leaderboardEntries)
      .where(and(eq(leaderboardEntries.hackathonId, hackathonId), eq(leaderboardEntries.teamId, teamId)));

    if (existing) {
      const [updated] = await db.update(leaderboardEntries)
        .set({ totalScore, updatedAt: new Date() })
        .where(eq(leaderboardEntries.id, existing.id))
        .returning();
      return updated;
    }

    const [created] = await db.insert(leaderboardEntries)
      .values({ hackathonId, teamId, totalScore })
      .returning();
    return created;
  }

  // Mentor Chat
  async getMentorChats(userId: string, hackathonId?: string): Promise<MentorChat[]> {
    if (hackathonId) {
      return db.select().from(mentorChats)
        .where(and(eq(mentorChats.userId, userId), eq(mentorChats.hackathonId, hackathonId)))
        .orderBy(asc(mentorChats.createdAt));
    }
    return db.select().from(mentorChats)
      .where(eq(mentorChats.userId, userId))
      .orderBy(asc(mentorChats.createdAt));
  }

  async createMentorChat(chat: InsertMentorChat): Promise<MentorChat> {
    const [created] = await db.insert(mentorChats).values(chat).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
