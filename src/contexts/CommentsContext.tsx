import { createContext, useContext, useEffect, useState } from "react";
import data from "../../data.json";

const LOCAL_STORAGE_KEY = "commentsAppData";

const CommentsContext = createContext(null);

export function CommentsProvider({ children }) {
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

  const [currentUser, setCurrentUser] = useState(getInitialData().currentUser);
  const [comments, setComments] = useState(getInitialData().comments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ currentUser, comments })
    );
  }, [currentUser, comments]);

  const handleScore = (id, action) => {
    const updateComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          score: comment.score + (action === "up" ? 1 : -1),
        };
      }

      const updatedReplies = comment.replies.map((reply) => {
        if (reply.id === id) {
          return {
            ...reply,
            score: reply.score + (action === "up" ? 1 : -1),
          };
        }
        return reply;
      });

      return { ...comment, replies: updatedReplies };
    });
    setComments(updateComments);
  };

  const addComments = (content, id) => {
    const newComment = {
      id: crypto.randomUUID(),
      content: content,
      createdAt: new Date().toISOString(),
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
      replies: [],
    };

    if (!id) {
      setComments((prev) => [...prev, newComment]);
      return;
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              ...newComment,
              replyingTo: comment.user.username,
            },
          ],
        };
      }

      const replyTarget = comment.replies.find((reply) => reply.id === id);
      if (replyTarget) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              ...newComment,
              replyingTo: replyTarget.user.username,
            },
          ],
        };
      }

      return comment;
    });

    setComments(updatedComments);
  };

  const editComments = (id, value) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          content: value,
          createdAt: new Date().toISOString(),
        };
      }

      const updatedReplies = comment.replies.map((reply) => {
        if (reply.id === id) {
          return {
            ...reply,
            content: value,
            createdAt: new Date().toISOString(),
          };
        }
        return reply;
      });

      return { ...comment, replies: updatedReplies };
    });

    setComments(updatedComments);
  };

  const removeComments = () => {
    if (deleteModalData) {
      const id = deleteModalData;
      const newComments = comments
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== id),
        }));

      setComments(newComments);
      setIsModalOpen(false);
    }
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        currentUser,
        isModalOpen,
        setIsModalOpen,
        handleScore,
        addComments,
        editComments,
        removeComments,
        deleteModalData,
        setDeleteModalData,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export const useComments = () => useContext(CommentsContext);
