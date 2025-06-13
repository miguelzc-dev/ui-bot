export const orthographyUseCase = async (
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

    const resp = await fetch(`${import.meta.env.VITE_GPT_ORDER}/test_reply  `, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: formData,
    });

    if (!resp.ok) throw new Error("No se pudo procesar");
    const data: string[] = (await resp.json()) as string[];
    console.log("responses", data);
    return {
      ok: true,
      message: data.join("\n------>"),
      files: files,
    };
  } catch (error) {
    return {
      ok: false,
      file: [],
      message: "No se pudo procesar",
    };
  }
};
