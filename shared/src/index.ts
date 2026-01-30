/** List of favorite book IDs (canonical type for favorites across app and API). */
export type FavoriteBookIds = string[];

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserDto extends User {
  favorites: FavoriteBookIds;
}

export interface RegisterBody {
  email: string;
  password: string;
  name?: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
