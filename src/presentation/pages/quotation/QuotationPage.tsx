import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBoxMultiFile,
  TypingLoader,
} from "../../components";
import { quotationUseCase } from "../../../core/use-cases/quotation.use-case";

interface Message {
  text: string;
  files: File[];
  isGpt: boolean;
}

export const QuotationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (phone: string, text: string, files: File[]) => {
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { text: text, files: files, isGpt: false },
    ]);

    const { ok, message } = await quotationUseCase(phone, text, files);
    if (!ok) {
      setMessages((prev) => [
        ...prev,
        {
          text: "No se pudo realizar la cotización",
          files: [],
          isGpt: true,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message as string,
          files: files,
          isGpt: true,
        },
      ]);
    }

    // Todo: Añadir el mensaje de isGPT en true

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div
        className="chat-messages"
        ref={(el) => el?.scrollTo(0, el.scrollHeight)}
      >
        <div className="grid grid-cols-12 gap-y-2">
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage
                key={index}
                text={message.text}
                files={message.files}
              />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>

        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
          onClick={() => {
            const chatContainer = document.querySelector(".chat-messages");
            chatContainer?.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          ↑
        </button>
      </div>

      <TextMessageBoxMultiFile
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        accept="image/*,application/pdf"
      />
    </div>
  );
};
