import ReactMarkdown from "react-markdown";

interface Props {
  text: string;
}

export const GptMessage = ({ text }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg w-full w-[calc(100vw-15vw)] md:w-full">
      <div className="flex flex-row items-start">
        <div className="relative ml-3 text-sm bg-[#FAFAFA] pt-3 pb-2 px-4 shadow rounded-xl">
          <span style={{ whiteSpace: "pre-wrap" }}>
            <ReactMarkdown
              components={{ a: LinkRenderer }}
              className="bot-response"
            >
              {text}
            </ReactMarkdown>
          </span>
        </div>
      </div>
    </div>
  );
};

const LinkRenderer = (props: any) => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
};
