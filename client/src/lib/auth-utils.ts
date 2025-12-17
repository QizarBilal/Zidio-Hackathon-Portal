export function isUnauthorizedError(error: Error): boolean {
  return false;
}

export function redirectToLogin(toast?: (options: { title: string; description: string; variant: string }) => void) {
  if (toast) {
    toast({
      title: "Demo Mode",
      description: "Authentication is not available in demo mode",
      variant: "default",
    });
  }
}
