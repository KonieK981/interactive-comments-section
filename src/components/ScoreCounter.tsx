const ScoreCounter = ({ score }) => {
  return (
    <div className="inline-flex gap-4 items-center bg-grey-50 px-3 py-2 rounded-xl">
      <button aria-label="Upvote">
        <img src="./images/icon-plus.svg" alt="" />
      </button>
      <span className="text-purple-600 font-medium">{score}</span>
      <button aria-label="Downvote">
        <img src="./images/icon-minus.svg" alt="" />
      </button>
    </div>
  );
};

export default ScoreCounter;
