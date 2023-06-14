import { FindManyOptions } from 'typeorm';

export abstract class AbstractConditions {
  private findOptions: FindManyOptions = {};

  page?: number;
  limit?: string;
  sDate?: Date;
  eDate?: Date;

  public abstract toFindOptions<E, O>(): FindManyOptions<E>;
}
// dtoClass: new () => T, entity: E | E[]
