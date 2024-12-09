import { OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['error', 'error', 'info', 'warn'],
      errorFormat: 'pretty',
    })
  }
  async onModuleInit() {
    return this.$connect()
  }
  async onModuleDestroy() {
    return this.$disconnect()
  }
}
