import axios from "axios";

export const marketplaceUseCase = async (
  signal: AbortSignal,
  token: string,
  prompt: string,
  files: File[],
  restart: boolean = false,
  country: string
) => {
  try {
    const formData = new FormData();
    formData.append("Body", prompt || "");
    formData.append("Token", token);
    formData.append("Restart_Conversation", `${restart}`);
    formData.append("Country", country?.toUpperCase() || "");
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
        signal: signal,
      }
    );

    return {
      ok: true,
      message: resp.data.join("\n"),
      files: files,
    };
  } catch (error: any) {
    if (error?.code == "ERR_CANCELED") return;
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
