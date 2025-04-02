import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() { }

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
