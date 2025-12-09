export type ChatFormData = {
  prompt: string;
};

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  input: string;
  setInput: (newValue: string) => void;
  status: string;
};

const ChatInput = ({ handleSubmit, input, setInput, status }: Props) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
    >
      <div className="flex gap-2">
        <input
          className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How can I help you?"
        />
        {status === "submitted" || status === "streaming" ? (
          <button
            onClick={stop}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status !== "ready"}
          >
            Send
          </button>
        )}
      </div>
    </form>
  );
};

export default ChatInput;
