import { CompareQuotationResponse } from "../../interfaces/compare-quotation";

export const compareQuotationUseCase = async (files?: File[]) => {
  try {
    const formData = new FormData();
    for (const file of files || []) {
      formData.append("files", file);
    }
    const resp = await fetch(
      `${import.meta.env.VITE_COMPARE_QUOTATION}/compare_pdf_files`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      }
    );

    if (!resp.ok) throw new Error("No se pudo procesar");
    const data = (await resp.json()) as CompareQuotationResponse;

    return {
      ok: true,
      message: "",
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo procesar",
      data: null,
    };
  }
};
