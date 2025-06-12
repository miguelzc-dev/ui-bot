export interface CompareQuotationResponse {
  summary: string;
  recommendation: string;
  detailed_changes: DetailedChange[];
  detailed_comparative: DetailedComparative[];
}

interface DetailedChange {
  proform: string;
  items: Item[];
  total: string;
  notes: string | string[];
}

interface Item {
  name: string;
  price: string;
  total: string;
  unidad: string;
  cantidad: string;
  iva: string;
}

interface DetailedComparative {
  product_name?: string;
  proformas: Proforma[];
}

interface Proforma {
  proforma: string;
  price: string;
  unidad: string;
  iva: string;
}
