import { useState } from "react";
import Button from "./buttons/Button";
import Form from "./Form";
import ScoreCounter from "./ScoreCounter";
import { useComments } from "../contexts/CommentsContext";
import { timeAgo } from "../utils";

const CommentCard = ({
  id,
  content,
  createdAt,
  score,
  username,
  userImg,
  replyingTo,
  owner,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const { handleScore, setIsModalOpen, setDeleteModalData } = useComments();

  const handleScoreAction = (action) => {
    handleScore(id, action);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
    setDeleteModalData(id);
  };

  const actions = owner ? (
    <div className="inline-flex gap-4">
      <Button
        imgUrl={
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
              fill="#ED6368"
            />
          </svg>
        }
        color="pink-400"
        text="Delete"
        alt="Delete button"
        classProps="delete-btn"
        handleClick={handleDelete}
      />
      <Button
        imgUrl={
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
              fill="#5357B6"
            />
          </svg>
        }
        color="purple-600"
        text="Edit"
        alt="Edit button"
        classProps="edit-btn"
        // handleClick={}
      />
    </div>
  ) : (
    <Button
      imgUrl={
        <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
            fill="#5357B6"
          />
        </svg>
      }
      color="purple-600"
      text="Reply"
      alt="Reply button"
      classProps="ghost-btn"
      handleClick={() => setIsReplying(true)}
    />
  );

  return (
    <>
      <article className="w-full flex flex-col md:flex-row gap-4 rounded-xl bg-white p-3">
        <div className="hidden md:block">
          <ScoreCounter score={score} handleClick={handleScoreAction} />
        </div>
        <div>
          <header className="flex justify-between">
            <div className="flex  items-center">
              <img src={userImg} alt="User avatar" className="w-10 h-10" />
              <span className="ml-4 text-lg font-medium text-grey-800">
                {username}
              </span>
              {owner && (
                <span className="bg-purple-600 text-white px-2 ml-4 rounded-xs">
                  you
                </span>
              )}
              <time className="ml-4 text-lg text-grey-500">
                {timeAgo(createdAt)}
              </time>
            </div>
            <div className=" hidden md:block">{actions}</div>
          </header>

          <p className="text-gray-500 text-xl text-left pt-4">
            {replyingTo && (
              <span className="text-purple-600 font-medium">
                @{replyingTo}{" "}
              </span>
            )}
            {content}
          </p>

          <footer className="flex justify-between mt-4 md:hidden">
            <ScoreCounter score={score} handleClick={handleScoreAction} />
            {actions}
          </footer>
        </div>
      </article>
      {isReplying && (
        <div className="relative bottom-2">
          <Form type="reply" userId={id} action={setIsReplying} />
        </div>
      )}
    </>
  );
};

export default CommentCard;
