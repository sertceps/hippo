import { Ctx, EventPattern, MqttContext, Payload } from '@nestjs/microservices';
import { TestDto } from './dtos/test.dto';

export default class SubController {
  @EventPattern('test/test')
  testDispatch(@Payload() payload: TestDto, @Ctx() ctx: MqttContext) {
    const topic = ctx.getTopic();
    // console.log(topic);
    // console.log(payload);
  }
}
