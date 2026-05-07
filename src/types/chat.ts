export interface Message {
  user: string;
  message: string;
}

export interface MatchData {
  roomId: string;

  users: string[];

  commonInterests: string[];
}

export interface OnlineUser {
  username: string;

  interests: string[];
}
