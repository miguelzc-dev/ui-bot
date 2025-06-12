import { useState } from "react";
import { compareQuotationUseCase } from "../../../core/use-cases/compare-quotation.use-case";
import { CompareQuotationResponse } from "../../../interfaces/compare-quotation";

export const CompareQuotationPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [data, setData] = useState<CompareQuotationResponse | null>();
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async (files: File[]) => {
    setIsLoading(true);
    setSelectedFiles(files);
    const { ok, message, data } = await compareQuotationUseCase(files);
    if (!ok) {
      alert(message);
      setIsLoading(false);
      return;
    }
    setData(data);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-0 flex-grow overflow-y-auto max-w-[calc(100vw-320px)] pr-2">
      <div className="grid grid-cols-12 gap-y-2">
        <div className="col-start-1 col-end-13 p-3">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">
              Comparador de cotizaciones
            </h2>
            <p className="mb-4">
              Selecciona los archivos de cotización para comparar:
            </p>
            <form
              className="flex flex-col space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handlePost(selectedFiles);
              }}
            >
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (
                      e.dataTransfer.files &&
                      e.dataTransfer.files.length > 0
                    ) {
                      setSelectedFiles(Array.from(e.dataTransfer.files));
                    }
                  }}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <i className="fa-solid fa-cloud-arrow-up text-2xl mb-2"></i>
                    <p className="mb-2 text-sm text-gray-300">
                      <span className="font-semibold">Haz clic para subir</span>{" "}
                      o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, Excel o documentos de texto
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    multiple
                    onChange={(e) => {
                      const fileList = e.target.files;
                      if (fileList) {
                        setSelectedFiles(Array.from(fileList));
                      }
                    }}
                  />
                </label>
              </div>
              <div id="file-list" className="flex flex-wrap gap-2">
                {selectedFiles &&
                  selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 text-white px-3 py-1 rounded-lg flex items-center"
                    >
                      <span className="mr-2 text-sm">{file.name}</span>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-white"
                        onClick={() => {
                          setSelectedFiles(
                            selectedFiles.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <i className="fa-solid fa-times"></i>
                      </button>
                    </div>
                  ))}
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={
                    isLoading || !selectedFiles || selectedFiles.length === 0
                  }
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">
                        <i className="fa-solid fa-spinner"></i>
                      </span>
                      Procesando...
                    </>
                  ) : (
                    "Comparar cotizaciones"
                  )}
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setSelectedFiles([]);
                    setData(null);
                  }}
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        {data && (
          <>
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-bold mb-2">Resumen</h3>
              <p className="text-gray-300">{data.summary}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-bold mb-2">Recomendación</h3>
              <p className="text-gray-300">{data.recommendation}</p>
            </div>

            <h3 className="text-lg font-bold mb-2">Proformas Detalladas</h3>
            <div className="flex flex-row  gap-4 overflow-x-auto pb-4">
              {data.detailed_changes.map((detailedChange, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg mb-4"
                  style={{ minWidth: "300px", maxWidth: "400px" }}
                >
                  <div className="flex flex-col gap-4">
                    <div id="container-table" className="min-w-0">
                      <h4 className="font-semibold mb-2">
                        Proforma: {detailedChange.proform}
                      </h4>
                      <div className="rounded-lg shadow overflow-x-auto">
                        <table className="w-full text-xs text-left text-gray-300">
                          <thead className="text-xs uppercase bg-gray-700">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Nombre
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Unidad
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Cantidad
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Precio
                              </th>
                              <th scope="col" className="px-6 py-3">
                                IVA
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {detailedChange.items.map((item, itemIndex) => (
                              <tr
                                key={itemIndex}
                                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                              >
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.unidad}</td>
                                <td className="px-6 py-4">{item.cantidad}</td>
                                <td className="px-6 py-4">{item.price}</td>
                                <td className="px-6 py-4">{item.iva}</td>
                                <td className="px-6 py-4">{item.total}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-700">
                            <tr>
                              <td
                                colSpan={5}
                                className="px-6 py-3 text-right font-medium"
                              >
                                Total:
                              </td>
                              <td className="px-6 py-3 font-bold">
                                {detailedChange.total}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="bg-gray-700 p-3 rounded-lg h-full">
                        <h5 className="font-bold mb-2">Notas:</h5>
                        {Array.isArray(detailedChange.notes) ? (
                          <ul className="list-disc pl-5">
                            {detailedChange.notes.map((note, noteIndex) => (
                              <li
                                key={noteIndex}
                                className="text-gray-300 text-xs"
                              >
                                {note}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-300 text-xs">
                            {detailedChange.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Tabla Comparativa</h3>
              <div className="flex flex-wrap gap-2">
                {data.detailed_comparative.map((detailedComparative, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 text-white px-3 py-1 rounded-lg flex items-center"
                  >
                    <span className="mr-2 text-sm">
                      {detailedComparative?.product_name || ""}
                    </span>
                    <div className="bg-gray-700 p-3 rounded-lg overflow-x-auto">
                      <table className="w-full text-xs text-left text-gray-300">
                        <thead className="text-xs uppercase bg-gray-600">
                          <tr>
                            <th scope="col" className="px-4 py-2"></th>
                            {detailedComparative.proformas.map(
                              (proforma, idx) => (
                                <th key={idx} scope="col" className="px-4 py-2">
                                  {proforma.proforma}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b bg-gray-700 border-gray-600">
                            <td className="px-4 py-2 font-semibold">Precio</td>
                            {detailedComparative.proformas.map(
                              (proforma, idx) => (
                                <td key={idx} className="px-4 py-2">
                                  {proforma.price}
                                </td>
                              )
                            )}
                          </tr>
                          <tr className="border-b bg-gray-700 border-gray-600">
                            <td className="px-4 py-2 font-semibold">Unidad</td>
                            {detailedComparative.proformas.map(
                              (proforma, idx) => (
                                <td key={idx} className="px-4 py-2">
                                  {proforma.unidad}
                                </td>
                              )
                            )}
                          </tr>
                          <tr className="border-b bg-gray-700 border-gray-600">
                            <td className="px-4 py-2 font-semibold">IVA</td>
                            {detailedComparative.proformas.map(
                              (proforma, idx) => (
                                <td key={idx} className="px-4 py-2">
                                  {proforma.iva}
                                </td>
                              )
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
