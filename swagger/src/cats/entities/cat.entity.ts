import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  /**
   * The name of the Cat
   * @example Kitty
   */
  name: string;

  @ApiProperty({
    example: 1,
    minimum: 1,
    default: 1,
    description: '고양이 나이',
  })
  age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: '고양이의 종',
  })
  breed: string;
}
