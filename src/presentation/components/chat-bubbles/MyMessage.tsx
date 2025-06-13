interface Props {
  text: string;
  files: File[];
}

export const MyMessage = ({ text, files }: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="relative mr-3 text-sm bg-[#E4E4E4] py-2 px-4 shadow rounded-xl">
          <span style={{ whiteSpace: "pre-wrap" }}>{text}</span>
          {files.length > 0 && (
            <div
              className={`mt-2 ${
                files.length > 4 ? "grid grid-cols-2 gap-1" : ""
              }`}
            >
              {files.map((file, index) => (
                <div key={index} className={files.length <= 4 ? "mt-2" : ""}>
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className={`${
                        files.length <= 4
                          ? "w-[100px] h-[100px]"
                          : "w-[80px] h-[80px]"
                      } object-cover rounded-lg`}
                    />
                  ) : (
                    <div className="text-xs text-[#060606] cursor-pointer">
                      <i className="fa-solid fa-paperclip text-sm mr-3"></i>
                      {file.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
