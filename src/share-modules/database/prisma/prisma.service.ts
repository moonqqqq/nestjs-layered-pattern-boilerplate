import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
// import { createSoftDeleteMiddleware } from 'prisma-soft-delete-middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    const options: Prisma.PrismaClientOptions = {
      errorFormat: 'pretty',
      // log: [{ level: 'info', emit: 'stdout' }],
      log: ['query', 'info', 'warn', 'error'],
    };

    if (configService.get('ENABLE_PRISMA_LOG') === 'true') {
      options.log?.push({ level: 'warn', emit: 'stdout' });
      options.log?.push({ level: 'error', emit: 'stdout' });
      options.log?.push({ level: 'query', emit: 'event' });
    }

    super(options);
  }

  async onModuleInit() {
    await this.$connect();
    // this.initSoftDeleteMiddleware();
  }

  // initSoftDeleteMiddleware() {
  // this.$use(
  //   createSoftDeleteMiddleware({
  //     // Add all models which need to support soft delete here
  //     models: {
  //       Wallet: true,
  //       Chatroom: true,
  //       Chatmessage: true,
  //       Highlight: true,
  //       HighlightWallets: true,
  //       AddressBookEntry: true,
  //       WalletHoldingHistory: true,
  //       Notification: true,
  //       Timeline: true,
  //     },
  //   })
  // );
  // }

  // async enableShutdownHooks(app: INestApplication) {
  //   // eslint-disable-next-line @typescript-eslint/no-misused-promises
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  //   // this.$on<any>('query', (event: Prisma.QueryEvent) => {
  //   //   console.log('Query: ' + event.query);
  //   //   console.log('Duration: ' + event.duration + 'ms');
  //   // });
  // }
}
