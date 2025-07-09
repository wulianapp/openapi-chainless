export interface LaunchOptions {
  authAppUrl: string; // 例如 'authapp://login?redirect=myapp://login-callback'
}

export interface AuthResult {
  token: string;
}
