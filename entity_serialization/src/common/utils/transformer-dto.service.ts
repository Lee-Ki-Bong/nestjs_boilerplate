import { plainToClass } from 'class-transformer';

export class TransformerDtoService {
  /**
   * convert entity to dto class instance
   * @augment_1 dto class
   * @augment_2 Entity instance | Entity instance[]
   * @returns {T[] | T}
   */
  public static toDto<T, E>(dtoClass: new () => T, entity: E | E[]): T | T[] {
    if (Array.isArray(entity)) {
      return entity.map((e) => plainToClass(dtoClass, e));
    }
    return plainToClass(dtoClass, entity);
  }
}
