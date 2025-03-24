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
import { TopicService } from './services/topic.service';
import { Topic } from './entities/topic.entity';
import { UUID } from 'crypto';
import { MessageService } from './services/message.service';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { BrokerSubscription } from './models/broker-subscription';
import { BrokerSubscriptionService } from './services/broker-subscription.service';

@ApiTags('Broker')
@Controller('broker')
export class BrokerController {
  constructor(
    private topicService: TopicService,
    private messageService: MessageService,
    private brokerSubscriptionService: BrokerSubscriptionService,
  ) {}

  @Get('info')
  @ApiOperation({ summary: 'Get Broker connection details' })
  getWebSocketInfo(): string {
    return 'Connect to /events using WebSocket for real-time communication.';
  }

  @Post('topic')
  @ApiOperation({ summary: 'Create a topic' })
  async createTopic(@Body() createTopicDto: CreateTopicDto): Promise<Topic[]> {
    try {
      return await this.topicService.save([createTopicDto]);
    } catch (error: any) {
      throw new BadRequestException(500, new Error(error));
    }
  }

  @Get('topic')
  @ApiOperation({ summary: 'Get topic' })
  @ApiQuery({ name: 'uuid', required: false })
  @ApiQuery({ name: 'name', required: false })
  async getTopic(
    @Query('uuid') uuid?: UUID,
    @Query('name') name?: string,
  ): Promise<Topic | null> {
    if (uuid) {
      try {
        return this.topicService.findOne(uuid);
      } catch (error: any) {
        throw new BadRequestException(500, new Error(error));
      }
    } else if (name) {
      try {
        return this.topicService.findOneByName(name);
      } catch (error: any) {
        throw new BadRequestException(500, new Error(error));
      }
    } else {
      throw new NotFoundException('');
    }
  }

  @Get('topics')
  @ApiOperation({ summary: 'Get all topic' })
  async getAllTopics(): Promise<Topic[]> {
    try {
      return await this.topicService.findAll();
    } catch (error: any) {
      throw new BadRequestException(500, new Error(error));
    }
  }

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

  @Get('subscriptions')
  @ApiOperation({ summary: 'Get subscriptions list' })
  async getSubscriptions(): Promise<BrokerSubscription[] | null> {
    const subscriptions = await this.brokerSubscriptionService.getList();
    if (subscriptions.length === 0) throw new NotFoundException('');
    return subscriptions;
  }
}
