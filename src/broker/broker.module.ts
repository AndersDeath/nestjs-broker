import { Module } from '@nestjs/common';
import { BrokerGateway } from './broker.gateway';
import { BrokerController } from './broker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Message } from './entities/message.entity';
import { MessageService } from './services/message.service';
import { BrokerSubscriptionService } from './services/broker-subscription.service';
import { TopicService } from './services/topic.service';
@Module({
  imports: [TypeOrmModule.forFeature([Topic, Message])],
  providers: [
    BrokerGateway,
    TopicService,
    MessageService,
    BrokerSubscriptionService,
  ],
  controllers: [BrokerController],
})
export class BrokerModule { }
