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
  return (
    <article className="w-full flex flex-col gap-4 rounded-xl bg-white p-4">
      <header className="flex  items-center">
        <img src={userImg} alt="User avatar" className="w-10 h-10" />
        <span className="ml-4 text-lg font-medium text-grey-800">
          {username}
        </span>
        <time className="ml-4 text-lg text-grey-500">{createdAt}</time>
      </header>

      <p className="text-gray-500 text-xl text-left">
        {replyingTo && (
          <span className="text-purple-600 font-medium">@{replyingTo} </span>
        )}
        {content}
      </p>

      <footer className="flex justify-between">
        <ScoreCounter score={score} />
        {editable ? (
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
            imgUrl="./images/icon-reply.svg"
            color="purple-600"
            text="Replay"
            alt="Replay button"
          />
        )}
      </footer>
    </article>
  );
};

export default CommentCard;
