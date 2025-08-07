import type { ReactNode, ButtonHTMLAttributes } from "react";
import React from "react";

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: Comment[];
  replyingTo?: string;
};

export type CommentsContextType = {
  comments?: Comment[];
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleScore: (id: string, action: "up" | "down") => void;
  addComments: (content?: string, id?: string) => void;
  editComments: (id: string, value: string) => void;
  removeComments: () => void;
  deleteModalData: string | null;
  setDeleteModalData: React.Dispatch<React.SetStateAction<string | null>>;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export interface ScoreCounterProps {
  score: number;
  handleClick: (action: "up" | "down") => void;
}

export interface FormProps {
  commentData?: { content: string };
  id?: string;
  action?: (show: boolean) => void;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imgUrl?: ReactNode;
  color?: string;
  text: string;
  alt?: string;
  spanProps?: string;
  classProps?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface CommentCardProps {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  username: string;
  userImg: string;
  replyingTo?: string;
}
