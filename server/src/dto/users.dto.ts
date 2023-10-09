import {IsNotEmpty, IsString} from "class-validator";

export class UsersDto {
    @IsNotEmpty()
    @IsString()
    cognito_id: string;

    @IsNotEmpty()
    @IsString()
    token: string;
}