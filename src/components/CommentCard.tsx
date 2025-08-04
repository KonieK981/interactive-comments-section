import Button from "./buttons/Button";
import ScoreCounter from "./ScoreCounter";

const CommentCard = ({
  content,
  createdAt,
  score,
  username,
  userImg,
  replyingTo,
  editable = false,
}) => {
  const actions = editable ? (
    <div className="inline-flex gap-4">
      <Button
        imgUrl="./images/icon-delete.svg"
        color="pink-400"
        text="Delete"
        alt="Delete button"
      />
      <Button
        imgUrl="./images/icon-edit.svg"
        color="purple-600"
        text="Edit"
        alt="Edit button"
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
    />
  );

  return (
    <article className="w-full flex flex-col md:flex-row gap-4 rounded-xl bg-white p-3">
      <div className="hidden md:block">
        <ScoreCounter score={score} />
      </div>
      <div>
        <header className="flex justify-between">
          <div className="flex  items-center">
            <img src={userImg} alt="User avatar" className="w-10 h-10" />
            <span className="ml-4 text-lg font-medium text-grey-800">
              {username}
            </span>
            <span className="bg-purple-600 text-white px-2 ml-4 rounded-xs">
              you
            </span>
            <time className="ml-4 text-lg text-grey-500">{createdAt}</time>
          </div>
          <div className=" hidden md:block">{actions}</div>
        </header>

        <p className="text-gray-500 text-xl text-left pt-4">
          {replyingTo && (
            <span className="text-purple-600 font-medium">@{replyingTo} </span>
          )}
          {content}
        </p>

        <footer className="flex justify-between mt-4 md:hidden">
          <ScoreCounter score={score} />
          {actions}
        </footer>
      </div>
    </article>
  );
};

export default CommentCard;
