import { IsNotEmpty } from 'class-validator'

export class CreateTaskDto {
  // require a title for usability -> eg. Write tests, write documentation
  @IsNotEmpty()
  title: string;

  description: string;
}