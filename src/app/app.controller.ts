import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor() {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Main static page returned successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getIndex() {
    return 'Nestjs Broker application';
  }
}
