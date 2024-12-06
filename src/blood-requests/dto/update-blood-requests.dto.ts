import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-blood-requests.dto';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {}
