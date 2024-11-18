import { IsString, IsNotEmpty, IsNumber, IsUrl } from "class-validator";
export class CreateResourceDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url: string;

    @IsNumber()
    @IsNotEmpty()
    technologyId: number;
}
