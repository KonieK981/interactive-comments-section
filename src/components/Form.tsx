import Button from "./buttons/Button";

const Form = () => {
  return (
    <div className="w-full rounded-xl bg-white p-4">
      <form action="" className="flex flex-col gap-4">
        <textarea
          name=""
          id=""
          rows={4}
          className="py-2 px-5 border-2 rounded-md border-grey-50"
          placeholder="Add a comment..."
        ></textarea>
        <footer className="mt-2 inline-flex justify-between">
          <img
            src="./images/avatars/image-maxblagun.webp"
            alt="User avatar"
            className="w-8 h-8"
          />
          <Button
            text="SEND"
            alt="Send button"
            classProps="px-6 py-2 text-white bg-purple-600 rounded-md"
            spanProps="text-md"
          />
        </footer>
      </form>
    </div>
  );
};

export default Form;
