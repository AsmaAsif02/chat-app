import { IsNotEmpty, IsArray , ArrayMinSize, ArrayMaxSize} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  members: Array<string>;
}
