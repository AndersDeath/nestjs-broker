import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
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
import { getExceptionText } from 'src/common/error.dict';
import { GetTopicQueryDto } from './dto/get-topic-query.dto';

@ApiTags('Broker')
@Controller('broker')
export class BrokerController {
  constructor(
    private topicService: TopicService,
    private messageService: MessageService,
    private brokerSubscriptionService: BrokerSubscriptionService,
  ) { }

  private readonly logger = new Logger(BrokerController.name);

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
      throw new BadRequestException(getExceptionText["CRATE_TOPIC_BAD_REQUEST"]);
    }
  }

  @Get('topic')
  @ApiOperation({ summary: 'Get topic' })
  async getTopic(
    @Query() query: GetTopicQueryDto): Promise<Topic | null> {
    if (query.uuid) {
      try {
        const response = await this.topicService.findOne(query.uuid);
        console.log(response);
        return response;
      } catch (error: any) {
        throw new BadRequestException(getExceptionText["GET_TOPIC_BAD_REQUEST"]('uuid'));
      }
    } else if (query.name) {
      try {
        const response = await this.topicService.findOneByName(query.name);
        if(!response) {
          throw new NotFoundException(getExceptionText["GET_TOPIC_NOT_FOUND"]('name'));
        }
        console.log(response);
        return response;
      } catch (error: any) {
        throw new BadRequestException(getExceptionText["GET_TOPIC_BAD_REQUEST"]('name'));
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
