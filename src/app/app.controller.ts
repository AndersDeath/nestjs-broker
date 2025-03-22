import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { template } from './app.view';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor() {}

  @Get('/')
  @ApiOperation({ summary: 'The main static page' })
  @ApiResponse({
    status: 200,
    description: 'Main static page returned successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getIndex() {
    return template;
  }
}
