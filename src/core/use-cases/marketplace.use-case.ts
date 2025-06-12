export const marketplaceUseCase = async (
  phone: string,
  prompt: string,
  files: File[]
) => {
  try {
    const formData = new FormData();
    formData.append("Body", prompt || "");
    formData.append("Token", "U2FsdGVkX19btyaN9pxAa3P3OZmnZNIu4AUtHS3lEWM=");
    formData.append("Restart_Conversation", "false");
    for (const file of files || []) {
      formData.append("Files", file);
    }

    const resp = await fetch(
      `${import.meta.env.VITE_GPT_MARKETPLACE}/chat_bot`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      }
    );

    if (!resp.ok) throw new Error("No se pudo procesar");
    const data = (await resp.json()) as String[];

    return {
      ok: true,
      message: data.join("\n"),
      files: files,
    };
  } catch (error) {
    return {
      ok: false,
      files: [],
      message: "No se pudo procesar",
    };
  }
};
