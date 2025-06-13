import { FormEvent, useRef, useState } from "react";

interface Props {
  onSendMessage: (message: string, files: File[]) => void;
  placeholder?: string;
  accept?: string;
}

export const TextMessageBoxMultiFile = ({
  onSendMessage,
  placeholder,
  accept,
}: Props) => {
  const [message, setMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSendMessage(message, selectedFile);
    setMessage("");
    setSelectedFile([]);
  };

  return (
    <form onSubmit={handleSendMessage}>
      {selectedFile.length > 0 ? (
        <div className="flex flex-row items-center px-4 gap-2 overflow-x-auto w-full py-1">
          <button
            type="button"
            title="Eliminar todo"
            className="text-xl text-red-700"
            onClick={() => {
              setSelectedFile([]);
              if (inputFileRef.current) {
                inputFileRef.current.value = "";
              }
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          {selectedFile.map((file, index) => (
            <div
              key={index}
              className="flex flex-row items-center bg-white border-2 border-black rounded-md gap-2 px-2"
              title={file.name}
            >
              <i className="fa-solid fa-file"></i>
              <span className="truncate flex-wrap first-letter:flex-wrap">
                {file.name.length > 10
                  ? `${file.name.slice(0, 10)}...`
                  : file.name}
              </span>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  setSelectedFile(selectedFile.filter((_, i) => i !== index));
                  if (inputFileRef.current) {
                    inputFileRef.current.value = "";
                  }
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <div className="flex flex-row items-center w-full h-auto justify-between gap-2 border border-[#5C5C5C] rounded-xl border-transparent p-2 shadow-sm">
        <textarea
          name="message"
          className="flex w-full rounded-xl pl-4 pt-2 bg-transparent focus:outline-none focus:ring-0 focus:border-transparent placeholder-gray-500 resize-none"
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
          className="btn-secondary text-white bg-primary rounded-full w-10 h-10 items-center  justify-center"
          type="submit"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
