export interface YouVersionLoginOptions {
  language?: string;
  requiredPerms?: string[];
  optionalPerms?: string[];
  onSuccess: (result: LoginSuccess) => void;
  onError: (error: LoginError) => void;
}

export interface LoginSuccess {
  lat: string;
  yvpUserId: string;
  grants: string[];
  session: string;
}

export interface LoginError {
  message: string;
  session?: string;
}
