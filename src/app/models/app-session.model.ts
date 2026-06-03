export interface UserData {
  loginStatus?: string;
  userId?: string;
  profilePicture?: string;
  [key: string]: any;
}

export interface Social {
  name: string;
  history: string;
  iconUrl: string;
  imgUrl: string;
  webUrl: string;
  color?: number;
}
