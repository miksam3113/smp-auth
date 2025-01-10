import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
