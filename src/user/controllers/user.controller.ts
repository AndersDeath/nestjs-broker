import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class UserController {

    constructor() { }

    @Get('/')
    @ApiResponse({
        status: 200,
        description: 'User controller empty page',
    })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    getIndex() {
        return 'User Controller';
    }
}
