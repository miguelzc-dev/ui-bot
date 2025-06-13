export const quotationUseCase = async (
  phone: string,
  prompt: string,
  files: File[]
) => {
  try {
    const formData = new FormData();
    for (const file of files || []) {
      formData.append("File", file);
    }
    formData.append("Body", prompt || "");
    formData.append("From", phone);
    formData.append("OriginalRepliedMessageSid", "");

    const resp = await fetch(
      `${import.meta.env.VITE_GPT_QUOTATION}/test_reply`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      }
    );

    if (!resp.ok) throw new Error("No se pudo procesar");
    const data = (await resp.json()) as String;

    return {
      ok: true,
      message: data,
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
