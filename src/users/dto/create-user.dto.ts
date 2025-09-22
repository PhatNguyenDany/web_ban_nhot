import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ description: 'First name of the user' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Address of the user' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Phone number of the user' })
  @IsNotEmpty()
  @IsString()
   @Matches(/^(0|\+84)\d{9,10}$/, {
      message: 'Phone number must be valid Vietnamese format',
    })
  phone: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Birth date of the user', type: String, format: 'date' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty({ description: 'Username for login' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password for login (min 6 characters)' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
