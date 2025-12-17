import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Re-export auth models
export * from "./models/auth";

// User roles enum type
export type UserRole = "participant" | "judge" | "mentor" | "recruiter" | "university" | "admin";

// User profiles with role-specific data
export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("participant"),
  bio: text("bio"),
  skills: text("skills").array(),
  organization: varchar("organization"),
  designation: varchar("designation"),
  linkedinUrl: varchar("linkedin_url"),
  githubUrl: varchar("github_url"),
  resumeUrl: varchar("resume_url"),
  phone: varchar("phone"),
  city: varchar("city"),
  state: varchar("state"),
  country: varchar("country").default("India"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Hackathons
export const hackathons = pgTable("hackathons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  bannerImageUrl: varchar("banner_image_url"),
  organizerName: varchar("organizer_name").notNull(),
  organizerLogoUrl: varchar("organizer_logo_url"),
  organizerType: varchar("organizer_type", { length: 50 }), // government, university, corporate, startup
  category: varchar("category", { length: 100 }), // AI/ML, Web3, FinTech, HealthTech, etc.
  mode: varchar("mode", { length: 50 }).default("online"), // online, offline, hybrid
  venue: varchar("venue"),
  city: varchar("city"),
  state: varchar("state"),
  country: varchar("country").default("India"),
  level: varchar("level", { length: 50 }).default("national"), // national, state, university, corporate
  prizePool: integer("prize_pool").default(0),
  currency: varchar("currency", { length: 10 }).default("INR"),
  maxTeamSize: integer("max_team_size").default(4),
  minTeamSize: integer("min_team_size").default(1),
  maxParticipants: integer("max_participants"),
  registrationStartDate: timestamp("registration_start_date"),
  registrationEndDate: timestamp("registration_end_date"),
  hackathonStartDate: timestamp("hackathon_start_date").notNull(),
  hackathonEndDate: timestamp("hackathon_end_date").notNull(),
  submissionDeadline: timestamp("submission_deadline"),
  judgingStartDate: timestamp("judging_start_date"),
  judgingEndDate: timestamp("judging_end_date"),
  resultsDate: timestamp("results_date"),
  status: varchar("status", { length: 50 }).default("draft"), // draft, upcoming, registration_open, ongoing, judging, completed
  isPaid: boolean("is_paid").default(false),
  entryFee: integer("entry_fee").default(0),
  eligibility: text("eligibility"),
  rules: text("rules"),
  judgingCriteria: jsonb("judging_criteria"),
  prizes: jsonb("prizes"),
  sponsors: jsonb("sponsors"),
  partners: jsonb("partners"),
  tags: text("tags").array(),
  websiteUrl: varchar("website_url"),
  contactEmail: varchar("contact_email"),
  isPublished: boolean("is_published").default(false),
  isFeatured: boolean("is_featured").default(false),
  createdById: varchar("created_by_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Problem Statements
export const problemStatements = pgTable("problem_statements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hackathonId: varchar("hackathon_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }),
  difficulty: varchar("difficulty", { length: 50 }), // easy, medium, hard
  expectedOutcome: text("expected_outcome"),
  resources: jsonb("resources"),
  datasetUrl: varchar("dataset_url"),
  maxSubmissions: integer("max_submissions"),
  sponsorName: varchar("sponsor_name"),
  sponsorLogoUrl: varchar("sponsor_logo_url"),
  prizeAmount: integer("prize_amount"),
  order: integer("order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Teams
export const teams = pgTable("teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hackathonId: varchar("hackathon_id").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  inviteCode: varchar("invite_code", { length: 20 }).unique(),
  leaderId: varchar("leader_id").notNull(),
  problemStatementId: varchar("problem_statement_id"),
  status: varchar("status", { length: 50 }).default("active"), // active, submitted, disqualified, winner
  isLookingForMembers: boolean("is_looking_for_members").default(false),
  requiredSkills: text("required_skills").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Team Members
export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teamId: varchar("team_id").notNull(),
  userId: varchar("user_id").notNull(),
  role: varchar("role", { length: 50 }).default("member"), // leader, member
  joinedAt: timestamp("joined_at").defaultNow(),
});

// Hackathon Registrations
export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hackathonId: varchar("hackathon_id").notNull(),
  userId: varchar("user_id").notNull(),
  teamId: varchar("team_id"),
  status: varchar("status", { length: 50 }).default("registered"), // registered, confirmed, cancelled
  paymentStatus: varchar("payment_status", { length: 50 }), // pending, completed, refunded
  paymentId: varchar("payment_id"),
  registeredAt: timestamp("registered_at").defaultNow(),
});

// Submissions
export const submissions = pgTable("submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hackathonId: varchar("hackathon_id").notNull(),
  teamId: varchar("team_id").notNull(),
  problemStatementId: varchar("problem_statement_id"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  githubUrl: varchar("github_url"),
  figmaUrl: varchar("figma_url"),
  demoVideoUrl: varchar("demo_video_url"),
  liveUrl: varchar("live_url"),
  presentationUrl: varchar("presentation_url"),
  documentUrls: text("document_urls").array(),
  techStack: text("tech_stack").array(),
  screenshots: text("screenshots").array(),
  status: varchar("status", { length: 50 }).default("draft"), // draft, submitted, under_review, scored, finalist, winner
  submittedAt: timestamp("submitted_at"),
  version: integer("version").default(1),
  aiQualityScore: integer("ai_quality_score"),
  aiPlagiarismScore: integer("ai_plagiarism_score"),
  aiFeedback: text("ai_feedback"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Scores (Judge evaluations)
export const scores = pgTable("scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  submissionId: varchar("submission_id").notNull(),
  judgeId: varchar("judge_id").notNull(),
  innovationScore: integer("innovation_score"),
  feasibilityScore: integer("feasibility_score"),
  technicalScore: integer("technical_score"),
  uiuxScore: integer("uiux_score"),
  presentationScore: integer("presentation_score"),
  overallScore: integer("overall_score"),
  feedback: text("feedback"),
  strengths: text("strengths"),
  improvements: text("improvements"),
  isComplete: boolean("is_complete").default(false),
  scoredAt: timestamp("scored_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Judge Assignments
export const judgeAssignments = pgTable("judge_assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hackathonId: varchar("hackathon_id").notNull(),
  judgeId: varchar("judge_id").notNull(),
  problemStatementId: varchar("problem_statement_id"),
  assignedAt: timestamp("assigned_at").defaultNow(),
});

// Mentor Assignments
export const mentorAssignments = pgTable("mentor_assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hackathonId: varchar("hackathon_id").notNull(),
  mentorId: varchar("mentor_id").notNull(),
  teamId: varchar("team_id"),
  assignedAt: timestamp("assigned_at").defaultNow(),
});

// Announcements
export const announcements = pgTable("announcements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hackathonId: varchar("hackathon_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  priority: varchar("priority", { length: 50 }).default("normal"), // low, normal, high, urgent
  targetAudience: varchar("target_audience", { length: 50 }).default("all"), // all, participants, judges, mentors
  isPublished: boolean("is_published").default(true),
  publishedAt: timestamp("published_at").defaultNow(),
  createdById: varchar("created_by_id"),
});

// Certificates
export const certificates = pgTable("certificates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hackathonId: varchar("hackathon_id").notNull(),
  userId: varchar("user_id").notNull(),
  teamId: varchar("team_id"),
  type: varchar("type", { length: 50 }).notNull(), // participation, winner, runner_up, special_mention, mentor, judge
  rank: integer("rank"),
  templateUrl: varchar("template_url"),
  certificateUrl: varchar("certificate_url"),
  verificationCode: varchar("verification_code", { length: 50 }).unique(),
  issuedAt: timestamp("issued_at").defaultNow(),
});

// Leaderboard entries (cached for performance)
export const leaderboardEntries = pgTable("leaderboard_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hackathonId: varchar("hackathon_id").notNull(),
  teamId: varchar("team_id").notNull(),
  rank: integer("rank"),
  totalScore: integer("total_score").default(0),
  submissionCount: integer("submission_count").default(0),
  lastSubmissionAt: timestamp("last_submission_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_leaderboard_hackathon_rank").on(table.hackathonId, table.rank)
]);

// AI Mentor Chat Messages
export const mentorChats = pgTable("mentor_chats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  hackathonId: varchar("hackathon_id"),
  message: text("message").notNull(),
  response: text("response"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const hackathonsRelations = relations(hackathons, ({ many }) => ({
  problemStatements: many(problemStatements),
  teams: many(teams),
  registrations: many(registrations),
  submissions: many(submissions),
  announcements: many(announcements),
  certificates: many(certificates),
  leaderboardEntries: many(leaderboardEntries),
}));

export const problemStatementsRelations = relations(problemStatements, ({ one }) => ({
  hackathon: one(hackathons, {
    fields: [problemStatements.hackathonId],
    references: [hackathons.id],
  }),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  hackathon: one(hackathons, {
    fields: [teams.hackathonId],
    references: [hackathons.id],
  }),
  problemStatement: one(problemStatements, {
    fields: [teams.problemStatementId],
    references: [problemStatements.id],
  }),
  members: many(teamMembers),
  submissions: many(submissions),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const registrationsRelations = relations(registrations, ({ one }) => ({
  hackathon: one(hackathons, {
    fields: [registrations.hackathonId],
    references: [hackathons.id],
  }),
  team: one(teams, {
    fields: [registrations.teamId],
    references: [teams.id],
  }),
}));

export const submissionsRelations = relations(submissions, ({ one, many }) => ({
  hackathon: one(hackathons, {
    fields: [submissions.hackathonId],
    references: [hackathons.id],
  }),
  team: one(teams, {
    fields: [submissions.teamId],
    references: [teams.id],
  }),
  problemStatement: one(problemStatements, {
    fields: [submissions.problemStatementId],
    references: [problemStatements.id],
  }),
  scores: many(scores),
}));

export const scoresRelations = relations(scores, ({ one }) => ({
  submission: one(submissions, {
    fields: [scores.submissionId],
    references: [submissions.id],
  }),
}));

// Insert schemas
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({ id: true, createdAt: true, updatedAt: true });
export const insertHackathonSchema = createInsertSchema(hackathons).omit({ id: true, createdAt: true, updatedAt: true });
export const insertProblemStatementSchema = createInsertSchema(problemStatements).omit({ id: true, createdAt: true });
export const insertTeamSchema = createInsertSchema(teams).omit({ id: true, createdAt: true, updatedAt: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true, joinedAt: true });
export const insertRegistrationSchema = createInsertSchema(registrations).omit({ id: true, registeredAt: true });
export const insertSubmissionSchema = createInsertSchema(submissions).omit({ id: true, createdAt: true, updatedAt: true });
export const insertScoreSchema = createInsertSchema(scores).omit({ id: true, createdAt: true });
export const insertAnnouncementSchema = createInsertSchema(announcements).omit({ id: true, publishedAt: true });
export const insertCertificateSchema = createInsertSchema(certificates).omit({ id: true, issuedAt: true });
export const insertLeaderboardEntrySchema = createInsertSchema(leaderboardEntries).omit({ id: true, updatedAt: true });
export const insertMentorChatSchema = createInsertSchema(mentorChats).omit({ id: true, createdAt: true });
export const insertJudgeAssignmentSchema = createInsertSchema(judgeAssignments).omit({ id: true, assignedAt: true });
export const insertMentorAssignmentSchema = createInsertSchema(mentorAssignments).omit({ id: true, assignedAt: true });

// Types
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertHackathon = z.infer<typeof insertHackathonSchema>;
export type Hackathon = typeof hackathons.$inferSelect;
export type InsertProblemStatement = z.infer<typeof insertProblemStatementSchema>;
export type ProblemStatement = typeof problemStatements.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = typeof submissions.$inferSelect;
export type InsertScore = z.infer<typeof insertScoreSchema>;
export type Score = typeof scores.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
export type Announcement = typeof announcements.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificates.$inferSelect;
export type InsertLeaderboardEntry = z.infer<typeof insertLeaderboardEntrySchema>;
export type LeaderboardEntry = typeof leaderboardEntries.$inferSelect;
export type InsertMentorChat = z.infer<typeof insertMentorChatSchema>;
export type MentorChat = typeof mentorChats.$inferSelect;
export type InsertJudgeAssignment = z.infer<typeof insertJudgeAssignmentSchema>;
export type JudgeAssignment = typeof judgeAssignments.$inferSelect;
export type InsertMentorAssignment = z.infer<typeof insertMentorAssignmentSchema>;
export type MentorAssignment = typeof mentorAssignments.$inferSelect;
