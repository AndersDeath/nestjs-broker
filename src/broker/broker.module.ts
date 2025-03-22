import { Module } from '@nestjs/common';
import { BrokerGateway } from './broker.gateway';
import { BrokerController } from './broker.controller';

@Module({
  imports: [],
  providers: [BrokerGateway],
  controllers: [BrokerController],
})
export class BrokerModule {}
