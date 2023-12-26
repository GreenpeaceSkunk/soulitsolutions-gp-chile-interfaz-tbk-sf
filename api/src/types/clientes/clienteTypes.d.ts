type Cliente = {
    id: number;
    nombre: string;
    apellido: string;
    rut: string;
    email: string;
    prefijo: number; // Note: You mentioned modifying this to a string later
    telefono: number;
    fecha_nacimiento?: string | null; // Nullable property with optional chaining
    pais?: string | null;
    region?: string | null;
    provincia?: string | null;
    comuna?: string | null;
    calle?: string | null;
    numero?: number | null;
    estado?: string | null;
  };

  