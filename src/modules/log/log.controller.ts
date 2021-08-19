import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Logs')
@Controller('logs')
export class LogController {}
