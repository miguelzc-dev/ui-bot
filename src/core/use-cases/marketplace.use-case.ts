export const marketplaceUseCase = async (
  phone: string,
  prompt: string,
  file?: File
) => {
  try {
    const formData = new FormData();
    formData.append("Body", prompt || "");
    formData.append("From", "+593989160386");

    const resp = await fetch(
      `${import.meta.env.VITE_GPT_MARKETPLACE}/test_reply`,
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
