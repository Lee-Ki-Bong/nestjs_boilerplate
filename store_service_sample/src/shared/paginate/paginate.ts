import {
  IPaginationMeta,
  IPaginationOptions,
  PaginationTypeEnum,
  TypeORMCacheType,
} from './paginate.interface';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { createPaginationObject } from './create-pagination';
import { Pagination } from './pagination';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

export async function paginate<T, C = IPaginationMeta>(
  repository: Repository<T>,
  options: IPaginationOptions<C>,
  searchOptions?: FindOptionsWhere<T> | FindManyOptions<T>,
): Promise<Pagination<T, C>> {
  return paginateRepository<T, C>(repository, options, searchOptions);
}

async function paginateRepository<T, C = IPaginationMeta>(
  repository: Repository<T>,
  options: IPaginationOptions<C>,
  searchOptions?: FindOptionsWhere<T> | FindManyOptions<T>,
): Promise<Pagination<T, C>> {
  const [page, limit, route, paginationType, countQueries] =
    resolveOptions(options);

  if (page < 1) {
    return createPaginationObject<T, C>({
      items: [],
      totalItems: 0,
      currentPage: page,
      limit,
      route,
      metaTransformer: options.metaTransformer,
      routingLabels: options.routingLabels,
    });
  }

  const promises: [Promise<T[]>, Promise<number> | undefined] = [
    repository.find({
      skip: limit * (page - 1),
      take: limit,
      ...searchOptions,
    }),
    undefined,
  ];

  if (countQueries) {
    promises[1] = repository.count({
      ...searchOptions,
    });
  }

  const [items, total] = await Promise.all(promises);

  return createPaginationObject<T, C>({
    items,
    totalItems: total,
    currentPage: page,
    limit,
    route,
    metaTransformer: options.metaTransformer,
    routingLabels: options.routingLabels,
  });

  function resolveOptions(
    options: IPaginationOptions<any>,
  ): [number, number, string, PaginationTypeEnum, boolean, TypeORMCacheType] {
    const page = resolveNumericOption(options, 'page', DEFAULT_PAGE);
    const limit = resolveNumericOption(options, 'limit', DEFAULT_LIMIT);
    const route = options.route;
    const paginationType =
      options.paginationType || PaginationTypeEnum.LIMIT_AND_OFFSET;
    const countQueries =
      typeof options.countQueries !== 'undefined' ? options.countQueries : true;
    const cacheQueries = options.cacheQueries || false;

    return [page, limit, route, paginationType, countQueries, cacheQueries];
  }

  function resolveNumericOption(
    options: IPaginationOptions<any>,
    key: 'page' | 'limit',
    defaultValue: number,
  ): number {
    const value = options[key];
    const resolvedValue = Number(value);

    if (Number.isInteger(resolvedValue) && resolvedValue >= 0)
      return resolvedValue;

    console.warn(
      `Query parameter "${key}" with value "${value}" was resolved as "${resolvedValue}", please validate your query input! Falling back to default "${defaultValue}".`,
    );
    return defaultValue;
  }
}
