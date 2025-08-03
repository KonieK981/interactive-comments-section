export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  userImg: string;
  userName: string;
  replyingTo?: string;
}
