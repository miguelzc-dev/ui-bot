import { useState } from "react";
import {
  GptMessage,
  GptOrthographyMessage,
  MyMessage,
  TextMessageBoxFile,
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

  const handlePost = async (phone: string, text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, message } = await marketplaceUseCase(phone, text);
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
    <div className="chat-container">
      {messages.length > 0 ? (
        <div
          className="chat-messages"
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
          <div className="chat-messages h-auto text-center gap-2 w-[80%] mx-auto py-auto flex flex-col justify-center">
            <h1 className="text-4xl font-bold">¡Hola!</h1>
            <p className="text-3xl">¿En que te puedo ayudar hoy?</p>
            {/* <button
              className="btn-option"
              onClick={() => {
                handlePost("", "hola, ayúdame a Actualizar Logo del exhibidor");
              }}
            >
              Actualizar Logo del exhibidor
            </button>
            <button
              className="btn-option"
              onClick={() => {
                handlePost(
                  "",
                  "hola, ayúdame a Actualizar Banner del exhibidor"
                );
              }}
            >
              Actualizar Banner del exhibidor
            </button>
            <button
              className="btn-option"
              onClick={() => {
                handlePost(
                  "",
                  "hola, ayúdame a Actualizar Descripción del exhibidor"
                );
              }}
            >
              Actualizar Descripción del exhibidor
            </button>
            <button
              className="btn-option"
              onClick={() => {
                handlePost("", "hola, ayúdame a Crear Producto");
              }}
            >
              Crear Producto
            </button>
            <button
              className="btn-option"
              onClick={() => {
                handlePost("", "hola, ayúdame a Crear Proforma");
              }}
            >
              Crear Proforma
            </button> */}
            <TextMessageBoxFile
              onSendMessage={handlePost}
              placeholder="Escribe aquí lo que deseas"
              accept=".png, .jpg, .jpeg"
              disableCorrections
            />
          </div>
        </>
      )}

      {messages.length > 0 && (
        <TextMessageBoxFile
          onSendMessage={handlePost}
          placeholder="Escribe aquí lo que deseas"
          accept=".png, .jpg, .jpeg"
          disableCorrections
        />
      )}
    </div>
  );
};
