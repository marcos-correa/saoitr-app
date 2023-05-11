export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserResponse {
  data: User[];
}

export interface UserError {
  error: string;
}

// creating interface for user creation with password
export interface UserCreation {
  name: string;
  email: string;
  password: string;
}
