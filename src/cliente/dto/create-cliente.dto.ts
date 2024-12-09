import { Cliente } from '@prisma/client'
import {
  IsString,
  IsInt,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator'

export class CreateClienteDto implements Cliente {
  @IsInt()
  @IsOptional()
  id: number

  @IsString()
  @IsNotEmpty()
  nome: string

  @IsString()
  @IsNotEmpty()
  telefone: string

  @IsDate()
  @IsOptional()
  criadoEm: Date

  @IsDate()
  @IsOptional()
  atualizadoEm: Date
}
