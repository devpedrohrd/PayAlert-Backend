import { Module } from '@nestjs/common'
import { ClienteService } from './cliente.service'
import { ClienteController } from './cliente.controller'
import { PrismaService } from 'src/config/Prisma.service'

@Module({
  controllers: [ClienteController],
  providers: [ClienteService, PrismaService],
})
export class ClienteModule {}
