import { WebSocketGateway } from '@nestjs/websockets';
import { ClientService } from './client.service';

@WebSocketGateway()
export class ClientGateway {
  constructor(private readonly clientService: ClientService) {}
}
