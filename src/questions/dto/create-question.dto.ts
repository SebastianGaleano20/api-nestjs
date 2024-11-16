import { IsString, IsNotEmpty, IsNumber } from 'class-validator'
//Data Transfer Object de Questions
export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    question: string;
    @IsString()
    @IsNotEmpty()
    answer: string;

    @IsNumber()
    @IsNotEmpty()
    technologyId: number;
}
