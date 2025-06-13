import axios from "axios";

export const marketplaceUseCase = async (
  token: string,
  prompt: string,
  files: File[]
) => {
  try {
    const formData = new FormData();
    formData.append("Body", prompt || "");
    formData.append("Token", token);
    formData.append("Restart_Conversation", "false");
    for (const file of files || []) {
      formData.append("Files", file);
    }

    const resp = await axios.post(
      `${import.meta.env.VITE_GPT_MARKETPLACE}/chat_bot`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      ok: true,
      message: resp.data.join("\n"),
      files: files,
    };
  } catch (error) {
    let errorMessage = "No se pudo procesar";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.detail || error.message;
    }
    return {
      ok: false,
      files: [],
      message: errorMessage,
    };
  }
};
