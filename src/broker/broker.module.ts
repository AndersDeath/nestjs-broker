import { Module } from '@nestjs/common';
import { BrokerGateway } from './broker.gateway';
import { BrokerController } from './controllers/broker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Message } from './entities/message.entity';
import { MessageService } from './services/message.service';
import { BrokerSubscriptionService } from './services/broker-subscription.service';
import { TopicService } from './services/topic.service';
import { TopicController } from './controllers/topic.controller';
import { MessageController } from './controllers/message.controller';
import { SubscriptionController } from './controllers/subscription.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Topic, Message])],
  providers: [
    BrokerGateway,
    TopicService,
    MessageService,
    BrokerSubscriptionService,
  ],
  controllers: [BrokerController, TopicController, MessageController, SubscriptionController],
})
export class BrokerModule { }
