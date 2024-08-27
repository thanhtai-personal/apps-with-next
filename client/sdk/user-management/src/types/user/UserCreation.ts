export interface UserCreation {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  status: string;
  roles?: number[] | string[];
}
