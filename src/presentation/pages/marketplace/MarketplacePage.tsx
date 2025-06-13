import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBoxMultiFile,
  TypingLoader,
} from "../../components";
import { marketplaceUseCase } from "../../../core/use-cases/marketplace.use-case";

interface Message {
  text: string;
  isGpt: boolean;
}

export const MarketplacePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (
    token: string,
    text: string,
    files: File[] = []
  ) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, message } = await marketplaceUseCase(token, text, files);
    if (!ok) {
      setMessages((prev) => [
        ...prev,
        {
          text: "No se pudo realizar la corrección",
          isGpt: true,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message as string,
          isGpt: true,
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
                <MyMessage key={index} text={message.text} />
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
          <div className="chat-messages text-center gap-2">
            <h1 className="text-3xl text-black font-bold">¡Hola!</h1>
            <p className="text-2xl text-black">¿En que te puedo ayudar hoy?</p>
          </div>
        </>
      )}

      <TextMessageBoxMultiFile
        onSendMessage={handlePost}
        placeholder="Pregúntame lo que necesites."
        accept=".png, .jpg, .jpeg"
        disableCorrections
      />
    </div>
  );
};
