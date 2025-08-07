import { useEffect, useState } from "react";
import data from "../../data.json";
import type { Comment } from "../types";

const LOCAL_STORAGE_KEY = "commentsAppData";

export function useComments() {
  const getInitialData = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return data;
      }
    }
    return data;
  };

  const [currentUser] = useState(getInitialData().currentUser);
  const [comments, setComments] = useState(getInitialData().comments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ currentUser, comments })
    );
  }, [currentUser, comments]);

  const handleScore = (id: string, action: string) => {
    setComments((prev: Comment[]) =>
      prev.map((comment: Comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            score: comment.score + (action === "up" ? 1 : -1),
          };
        }
        const updatedReplies = comment.replies.map((reply) =>
          reply.id === id
            ? { ...reply, score: reply.score + (action === "up" ? 1 : -1) }
            : reply
        );
        return { ...comment, replies: updatedReplies };
      })
    );
  };

  const addComments = (content?: string, id?: string) => {
    const newComment = {
      id: crypto.randomUUID(),
      content,
      createdAt: new Date().toISOString(),
      score: 0,
      user: {
        image: { ...currentUser.image },
        username: currentUser.username,
      },
      replies: [],
    };

    setComments((prev: Comment[]) => {
      if (!id) return [...prev, newComment];

      return prev.map((comment: Comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              { ...newComment, replyingTo: comment.user.username },
            ],
          };
        }
        const replyTarget = comment.replies.find((reply) => reply.id === id);
        if (replyTarget) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              { ...newComment, replyingTo: replyTarget.user.username },
            ],
          };
        }
        return comment;
      });
    });
  };

  const editComments = (id: string, value: string) => {
    setComments((prev: Comment[]) =>
      prev.map((comment: Comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            content: value,
            createdAt: new Date().toISOString(),
          };
        }
        const updatedReplies = comment.replies.map((reply) =>
          reply.id === id
            ? { ...reply, content: value, createdAt: new Date().toISOString() }
            : reply
        );
        return { ...comment, replies: updatedReplies };
      })
    );
  };

  const removeComments = () => {
    const removeRecursive = (items: Comment[] = []): Comment[] =>
      items
        .filter((item) => String(item.id) !== String(deleteModalData))
        .map((item) => ({
          ...item,
          replies: removeRecursive(item.replies ?? []),
        }));

    setComments((prev: Comment[]) => removeRecursive(prev));
    setIsModalOpen(false);
  };

  return {
    comments,
    currentUser,
    isModalOpen,
    setIsModalOpen,
    deleteModalData,
    setDeleteModalData,
    handleScore,
    addComments,
    editComments,
    removeComments,
  };
}
