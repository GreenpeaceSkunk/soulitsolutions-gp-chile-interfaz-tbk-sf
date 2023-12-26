import { Expose, Type } from "class-transformer";
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  isURL,
} from "class-validator";

class InscripcionRequestDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Expose()
  public tipoDonacion: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Expose()
  public nombre: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Expose()
  public apellido: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Expose()
  public rut: string;

  @IsDefined()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Expose()
  public email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  @Expose()
  public prefijo: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Expose()
  public telefono: string;

  // @IsDefined()
  // // @IsDate()
  // @IsNotEmpty()
  @Expose()
  public fechaNacimiento: Date;

  @IsDefined()
  @IsString()
  @MaxLength(100)
  @Expose()
  public pais: string;

  @IsDefined()
  @IsString()
  @MaxLength(100)
  @Expose()
  public region: string;

  @IsDefined()
  @IsString()
  @MaxLength(100)
  @Expose()
  public provincia: string;

  @IsDefined()
  @IsString()
  @MaxLength(100)
  @Expose()
  public comuna: string;

  // @IsDefined()
  // @IsString()
  // @IsNotEmpty()
  // @MaxLength(100)
  @Expose()
  public calle: string;

  // @IsDefined()
  // // @IsInt()
  // @IsNotEmpty()
  @Expose()
  public numero: number;

  @IsDefined()
  // @IsNumber()
  @IsNotEmpty()
  @Expose()
  public monto: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Expose()
  public utmSource: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Expose()
  public utmMedium: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Expose()
  public utmContent: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Expose()
  public utmTerm: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Expose()
  public utmCampaign: string;

  @IsDefined()
  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  public titular: boolean;

  @IsString()
  @Expose()
  public tarjetaHabienteRut: string;

  @IsString()
  @Expose()
  public tarjetaHabienteNombre: string;
}

export default InscripcionRequestDTO;
