import { IsNotEmpty, IsString, IsObject } from 'class-validator';

class TokensDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  idToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class SetTokenDto {
  @IsObject()
  @IsNotEmpty()
  tokens: TokensDto;

  @IsNotEmpty()
  userInfo: any;
}
