import { useEffect, useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBoxMultiFile,
  TypingLoader,
} from "../../components";
import { marketplaceUseCase } from "../../../core/use-cases/marketplace.use-case";
import { useSearchParams } from "react-router-dom";

interface Message {
  text: string;
  isGpt: boolean;
  files: File[];
}
interface Props {
  message: string;
  restart: boolean;
}

export const MarketplacePage = ({ message, restart }: Props) => {
  const [searchParam] = useSearchParams();
  console.log("token", searchParam.get("token"));
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const token = searchParam.get("token") || "";

  useEffect(() => {
    if (token) {
      setMessages([]);
      if (message != "") handlePost(message, [], restart);
    }
  }, [message]);

  const handlePost = async (
    text: string,
    files: File[] = [],
    restartConversation: boolean = false
  ) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false, files }]);

    const { ok, message } = await marketplaceUseCase(
      token,
      text,
      files,
      restartConversation
    );
    if (!ok) {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isGpt: true,
          files,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message as string,
          isGpt: true,
          files: [],
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div
      className={
        messages.length > 0 ? "chat-container h-full" : "chat-container px-60 "
      }
    >
      {messages.length > 0 ? (
        <div
          className="chat-messages h-full"
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
        </div>
      ) : (
        <>
          <div className="chat-messages h-auto text-center gap-2 w-[80%] mx-auto py-auto flex flex-col justify-center">
            <h1 className="text-4xl font-bold">¡Hola!</h1>
            <p className="text-3xl">¿En que te puedo ayudar hoy?</p>

            <TextMessageBoxMultiFile
              onSendMessage={handlePost}
              placeholder="Escribe aquí lo que deseas"
              accept=".png, .jpg, .jpeg"
            />
          </div>
        </>
      )}

      {messages.length > 0 && (
        <TextMessageBoxMultiFile
          onSendMessage={handlePost}
          placeholder="Escribe aquí lo que deseas"
          accept=".png, .jpg, .jpeg"
        />
      )}
    </div>
  );
};
