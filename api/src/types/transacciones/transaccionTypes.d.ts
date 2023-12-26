type Transaccion = {
  id: number;
  response_url: string;
  tipo_de_transaccion: "Inscripcion" | "Pago"; // Enum type
  utm_source: string;
  utm_medium: string;
  utm_content: string;
  utm_term: string;
  utm_campaign: string;
  monto: number;
  estado: string;
  cliente_id: number;
  tipo_donacion: string;
  token?: string | null; // Nullable property with optional chaining
  checkout_url?: string | null;
  codigo_respuesta?: number | null;
  tbk_user?: string | null;
  codigo_autorizacion?: string | null;
  tipo_tarjeta?: string | null;
  numero_tarjeta?: string | null;
  titular?: boolean | null;
  tarjetahabiente_rut?: string | null;
  tarjetahabiente_nombre?: string | null;
  staging_ID?: string | null;
};
