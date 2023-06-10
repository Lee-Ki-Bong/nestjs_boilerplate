import { Exclude, Expose } from 'class-transformer';
import { AbstractEntity } from 'src/common/entities/abstact.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends AbstractEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  // @Exclude()
  password: string;

  @Expose()
  get userNameAndNumber(): string {
    return `${this.username} ${this.id}`;
  }
}
