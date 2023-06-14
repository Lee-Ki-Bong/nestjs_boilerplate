import { plainToClass, plainToInstance } from 'class-transformer';
import { ObjectLiteral } from 'typeorm';
import { Pagination } from '../paginate/pagination';

export class TransformerDtoService {
  /**
   * convert entity to dto class instance
   * @augment_1 dto class
   * @augment_2 Entity instance | Entity instance[]
   * @returns {T[] | T} Pagination | Repository
   */
  public static toDto<T, ObjectLiteral>(
    dtoClass: new () => T,
    data: ObjectLiteral | ObjectLiteral[],
  ): T | T[] {
    if (data instanceof Pagination) {
      return plainToInstance(dtoClass, data.list);
    }
    return plainToClass(dtoClass, data);
  }
}
