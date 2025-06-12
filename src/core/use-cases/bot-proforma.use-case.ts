export const prosConsUseCase = async (
  phone: string,
  prompt: string,
  file?: File
) => {
  try {
    const formData = new FormData();
    if (file) formData.append("File", file);
    formData.append("Body", prompt || "");
    formData.append("From", phone);

    const resp = await fetch(`${import.meta.env.VITE_GPT_PROFORM}/test_reply`, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: formData,
    });

    if (!resp.ok) throw new Error("No se pudo procesar");
    const data: string[] = (await resp.json()) as string[];

    return {
      ok: true,
      message: data.join("<----->"),
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
