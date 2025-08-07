import CommentCard from "./components/CommentCard";
import Form from "./components/Form";
import Modal from "./components/Modal";
import Button from "./components/buttons/Button";
import React, { useContext } from "react";
import type { Comment } from "./types";
import { CommentsContext } from "./contexts/CommentsContext";

function App() {
  const {
    comments,
    isModalOpen,
    setIsModalOpen,
    removeComments,
    setDeleteModalData,
  } = useContext(CommentsContext);

  return (
    <>
      <div className="flex flex-col gap-4 px-3 py-6 max-w-5xl mx-auto sm:px-8">
        {comments?.map((comment: Comment) => (
          <React.Fragment key={comment.id}>
            <CommentCard
              id={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              score={comment.score}
              username={comment.user.username}
              userImg={comment.user.image.webp}
            />

            {comment.replies.length > 0 && (
              <div className="flex flex-col gap-3 border-l-2 border-grey-100 pl-3 md:pl-6 md:ml-6">
                {comment.replies.map((reply) => (
                  <CommentCard
                    key={reply.id}
                    id={reply.id}
                    content={reply.content}
                    createdAt={reply.createdAt}
                    score={reply.score}
                    username={reply.user.username}
                    userImg={reply.user.image.webp}
                    replyingTo={reply.replyingTo}
                  />
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
        <div className="mt-3">
          <Form />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setDeleteModalData(null);
        }}
      >
        <h2 className="text-md font-medium text-grey-800 text-left">
          Delete comment
        </h2>
        <p className="mt-2 text-left text-grey-500 text-sm">
          Are you sure you want to delete this comment? This will remove the
          comment and cant't be undone.
        </p>
        <div className="w-full mt-4 inline-flex justify-between">
          <Button
            text="NO, CANCEL"
            alt="Cancel button"
            classProps="px-4 py-2 text-white bg-grey-500 rounded-md hover:bg-grey-100"
            spanProps="text-sm"
            handleClick={() => {
              setIsModalOpen(false);
              setDeleteModalData(null);
            }}
          />
          <Button
            text="YES, DELETE"
            alt="Delete button"
            classProps=" px-4 py-2 text-white bg-pink-400 rounded-md hover:bg-pink-200"
            spanProps="text-sm"
            handleClick={removeComments}
          />
        </div>
      </Modal>
    </>
  );
}

export default App;
