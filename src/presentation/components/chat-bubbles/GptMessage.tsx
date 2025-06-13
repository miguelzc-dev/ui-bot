interface Props {
  text: string;
}

export const GptMessage = ({ text }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="relative ml-3 text-sm bg-[#FAFAFA] pt-3 pb-2 px-4 shadow rounded-xl">
          <span style={{ whiteSpace: "pre-wrap" }}>{text}</span>
        </div>
      </div>
    </div>
  );
};
