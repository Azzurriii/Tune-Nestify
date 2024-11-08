import { PartialType } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength, Matches, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ 
    example: 'johndoe',
    description: 'Username of the user' 
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9_-]*$/, {
    message: 'Username can only contain letters, numbers, underscores and hyphens'
  })
  username?: string;

  @ApiPropertyOptional({ 
    example: 'John Doe',
    description: 'Full name of the user' 
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  fullName?: string;

  @ApiPropertyOptional({ 
    example: 'john.doe@example.com',
    description: 'Email address of the user' 
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ 
    example: 'NewPassword123!',
    description: 'New password for the user account' 
  })
  @IsOptional()
  @IsString()
  @MinLength(8, {
    message: 'Password must at least 8 characters long'
  })
  password?: string;

  @ApiPropertyOptional({ 
    example: true,
    description: 'Whether the user account is active' 
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}