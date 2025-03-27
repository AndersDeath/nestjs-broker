import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, } from '@nestjs/swagger';

@ApiTags('Broker')
@Controller('v1/broker')
export class BrokerController {

  @Get('info')
  @ApiOperation({ summary: 'Get Broker connection details' })
  getWebSocketInfo(): string {
    return 'Connect to /broker using WebSocket for real-time communication.';
  }

}
