export const quotationUseCase = async (
  phone: string,
  prompt: string,
  file?: File
) => {
  try {
    const formData = new FormData();
    // if (file) formData.append("File", file);
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
      file: file,
    };
  } catch (error) {
    return {
      ok: false,
      file: undefined,
      message: "No se pudo procesar",
    };
  }
};
