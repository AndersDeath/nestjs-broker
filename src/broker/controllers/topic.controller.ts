import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Topic } from '../entities/topic.entity';
import { CreateTopicDto } from '../dtos/create-topic.dto';
import { getExceptionText } from 'src/common/error.dict';
import { GetTopicQueryDto } from '../dtos/get-topic-query.dto';
import { TopicService } from '../services/topic.service';
import { TopicSwagger } from 'src/common/topic.swagger';

@ApiTags('Broker')
@Controller('v1/broker')
export class TopicController {
    constructor(
        private topicService: TopicService
    ) { }


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
    @ApiOperation(TopicSwagger.operation)
    @ApiResponse(TopicSwagger.code_200)
    @ApiResponse(TopicSwagger.code_403)
    async getTopic(
        @Query() query: GetTopicQueryDto): Promise<Topic | null> {
        if (query.uuid) {
            return this.topicService.findByUUID(query.uuid);
        } else if (query.name) {
            return this.topicService.findByName(query.name);
        } else {
            throw new NotFoundException(getExceptionText["GET_TOPIC_NOT_FOUND"]);
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
}
