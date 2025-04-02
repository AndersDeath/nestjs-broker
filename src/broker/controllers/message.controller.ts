import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { MessageService } from '../services/message.service';
import { Message } from '../entities/message.entity';
import { CreateMessageDto } from '../dtos/create-message.dto';

@ApiTags('Broker')
@Controller('v1/broker')
export class MessageController {
    constructor(
        private messageService: MessageService,
    ) { }

    @Post('message')
    @ApiOperation({ summary: 'Create a message' })
    async createMessage(
        @Body() createMessageDto: CreateMessageDto,
    ): Promise<Message> {
        try {
            return await this.messageService.save(createMessageDto);
        } catch (error: any) {
            throw new BadRequestException(500, new Error(error));
        }
    }

    @Get('message')
    @ApiOperation({ summary: 'Get message' })
    @ApiQuery({ name: 'uuid', required: false })
    async getMessage(@Query('uuid') uuid?: UUID): Promise<Message | null> {
        if (uuid) {
            try {
                return this.messageService.findOne(uuid);
            } catch (error: any) {
                throw new BadRequestException(500, new Error(error));
            }
        } else throw new NotFoundException('');
    }

    @Get('messages')
    @ApiOperation({ summary: 'Get all topic' })
    async getAllMessages(): Promise<Message[]> {
        try {
            return await this.messageService.findAll();
        } catch (error: any) {
            throw new BadRequestException(500, new Error(error));
        }
    }
}
