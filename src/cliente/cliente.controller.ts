import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  ParseIntPipe,
} from '@nestjs/common'
import { ClienteService } from './cliente.service'
import { CreateClienteDto } from './dto/create-cliente.dto'
import { UpdateClienteDto } from './dto/update-cliente.dto'

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    try {
      return await this.clienteService.create(createClienteDto)
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar cliente',
        error.message,
      )
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.clienteService.findAll()
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar clientes',
        error.message,
      )
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.clienteService.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar cliente',
        error.message,
      )
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    try {
      return await this.clienteService.update(id, updateClienteDto)
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar cliente',
        error.message,
      )
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.clienteService.remove(id)
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao remover cliente',
        error.message,
      )
    }
  }
}
