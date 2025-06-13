import { FormEvent, useRef, useState } from "react";

interface Props {
  onSendMessage: (phone: string, message: string, file?: File) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string;
}

export const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  accept,
}: Props) => {
  const [message, setMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSendMessage(
      "U2FsdGVkX19btyaN9pxAa3P3OZmnZNIu4AUtHS3lEWM=",
      message,
      selectedFile[0] || undefined
    );
    setMessage("");
    setSelectedFile([]);
  };

  return (
    <form onSubmit={handleSendMessage}>
      {selectedFile.length > 0 ? (
        <div className="flex items-center mb-2">
          {selectedFile.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-800 text-gray-200 rounded-lg p-2"
            >
              <span className="truncate">{file.name}</span>
              <span className="text-sm text-gray-500">
                {Math.round(file.size / 1024)} KB
              </span>
            </div>
          ))}
          <button
            type="button"
            className="text-red-500 hover:text-red-700"
            onClick={() => {
              setSelectedFile([]);
              if (inputFileRef.current) {
                inputFileRef.current.value = "";
              }
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ) : null}
      <div className="flex flex-row items-center w-full h-auto justify-between gap-2  rounded-xl bg-[#2B2929] border-transparent p-2 shadow-sm focus-within:border-transparent">
        <textarea
          name="message"
          className="flex w-full rounded-xl pl-4 pt-2 bg-transparent focus:outline-none focus:ring-0 focus:border-transparent text-gray-200 placeholder-gray-500 resize-none"
          placeholder={placeholder}
          autoComplete={"off"}
          autoCorrect={"off"}
          spellCheck={"false"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e as unknown as FormEvent<HTMLFormElement>);
            }
          }}
        />

        <>
          <button
            type="button"
            className="flex items-center justify-center text-gray-400 hover:text-gray-600"
            onClick={() => inputFileRef.current?.click()}
          >
            <i className="fa-solid fa-paperclip text-xl"></i>
          </button>

          <input
            type="file"
            ref={inputFileRef}
            accept={accept}
            onChange={(e) =>
              setSelectedFile(e.target.files ? Array.from(e.target.files) : [])
            }
            hidden
            multiple={true}
          />
        </>

        <button
          className="btn-secondary bg-primary rounded-xl w-10"
          type="submit"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
