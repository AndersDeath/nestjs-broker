import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Broker') // Add a tag for WebSocket-related documentation
@Controller('broker')
export class BrokerController {
  @Get('info')
  @ApiOperation({ summary: 'Get Broker connection details' })
  getWebSocketInfo(): string {
    return 'Connect to /events using WebSocket for real-time communication.';
  }
}
