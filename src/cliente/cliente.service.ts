import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateClienteDto } from './dto/create-cliente.dto'
import { UpdateClienteDto } from './dto/update-cliente.dto'
import { PrismaService } from 'src/config/Prisma.service'

@Injectable()
export class ClienteService {
  constructor(private prismaService: PrismaService) {}

  async checarClienteExiste(telefone: string): Promise<boolean> {
    const cliente = await this.prismaService.cliente.findFirst({
      where: {
        telefone,
      },
    })

    if (cliente) {
      return true
    }
    return false
  }

  async create(createClienteDto: CreateClienteDto) {
    const clienteExiste = await this.checarClienteExiste(
      createClienteDto.telefone,
    )

    if (clienteExiste) {
      throw new HttpException('Cliente já cadastrado', HttpStatus.CONFLICT)
    }

    const clienteCriado = await this.prismaService.cliente.create({
      data: {
        ...createClienteDto,
      },
    })

    if (!clienteCriado) {
      throw new HttpException('Erro ao criar cliente', HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    const clientes = await this.prismaService.cliente.findMany()

    return clientes ? clientes : []
  }

  async findOne(id: number) {
    const cliente = await this.prismaService.cliente.findUnique({
      where: {
        id,
      },
    })

    if (!cliente) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND)
    }

    return cliente
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.prismaService.cliente.findUnique({
      where: {
        id,
      },
    })

    if (!cliente) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND)
    }

    const clienteAtualizado = await this.prismaService.cliente.update({
      where: {
        id,
      },
      data: {
        ...updateClienteDto,
      },
    })

    if (!clienteAtualizado) {
      throw new HttpException(
        'Erro ao atualizar cliente',
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async remove(id: number) {
    const cliente = await this.prismaService.cliente.findUnique({
      where: {
        id,
      },
    })

    if (!cliente) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND)
    }

    const clienteRemovido = await this.prismaService.cliente.delete({
      where: {
        id,
      },
    })

    if (!clienteRemovido) {
      throw new HttpException('Erro ao remover cliente', HttpStatus.BAD_REQUEST)
    }
  }
}
