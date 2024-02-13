import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientGateway } from './client.gateway';

@Module({
  providers: [ClientGateway, ClientService],
})
export class ClientModule {}
