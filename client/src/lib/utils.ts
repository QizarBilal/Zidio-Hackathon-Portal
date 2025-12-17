import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "TBD";
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "MMM d, yyyy");
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return "TBD";
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "MMM d, yyyy 'at' h:mm a");
}

export function formatRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function getTimeRemaining(targetDate: Date | string | null | undefined): string {
  if (!targetDate) return "";
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
  const now = new Date();
  
  if (target <= now) return "Ended";

  const days = differenceInDays(target, now);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} left`;

  const hours = differenceInHours(target, now);
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} left`;

  const minutes = differenceInMinutes(target, now);
  return `${minutes} minute${minutes > 1 ? "s" : ""} left`;
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    upcoming: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    registration_open: "bg-green-500/10 text-green-600 dark:text-green-400",
    ongoing: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    judging: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    completed: "bg-muted text-muted-foreground",
    active: "bg-green-500/10 text-green-600 dark:text-green-400",
    submitted: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    under_review: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    scored: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    finalist: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    winner: "bg-green-500/10 text-green-600 dark:text-green-400",
  };
  return colors[status] || "bg-muted text-muted-foreground";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: "Draft",
    upcoming: "Upcoming",
    registration_open: "Registration Open",
    ongoing: "Live",
    judging: "Judging",
    completed: "Completed",
    active: "Active",
    submitted: "Submitted",
    under_review: "Under Review",
    scored: "Scored",
    finalist: "Finalist",
    winner: "Winner",
  };
  return labels[status] || status;
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: "bg-muted text-muted-foreground",
    normal: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    high: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    urgent: "bg-red-500/10 text-red-600 dark:text-red-400",
  };
  return colors[priority] || "bg-muted text-muted-foreground";
}
