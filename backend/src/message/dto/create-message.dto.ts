import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {

    @ArrayNotEmpty()
    target: string[];

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}
