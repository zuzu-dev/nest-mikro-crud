import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from "typeorm";
import { QueryDto } from "../dtos";
import { LookupFields } from "./lookup-fields.type";

export interface RestService<
  Entity = any,
  CreateDto = Entity,
  UpdateDto = CreateDto,
  LookupField extends LookupFields<Entity> = LookupFields<Entity>,
  CustomArgs extends any[] = any[]
> {
  readonly repository: Repository<Entity>;

  list(queries: QueryDto<Entity>, ...args: CustomArgs): Promise<Entity[]>;

  create(
    queries: QueryDto<Entity>,
    dto: CreateDto,
    ...args: CustomArgs
  ): Promise<Entity>;

  retrieve(
    lookup: Entity[LookupField],
    queries: QueryDto<Entity>,
    ...args: CustomArgs
  ): Promise<Entity>;

  replace(
    lookup: Entity[LookupField],
    queries: QueryDto<Entity>,
    dto: CreateDto,
    ...args: CustomArgs
  ): Promise<Entity>;

  update(
    lookup: Entity[LookupField],
    queries: QueryDto<Entity>,
    dto: UpdateDto,
    ...args: CustomArgs
  ): Promise<Entity>;

  destroy(
    lookup: Entity[LookupField],
    queries: QueryDto<Entity>,
    ...args: CustomArgs
  ): Promise<Entity>;

  count(...args: CustomArgs): Promise<number>;

  /**
   * Transform the entity before sending the response.
   *
   * Interceptors are not used because overloading may change the data structure.
   */
  transform(entity: Entity, ...args: CustomArgs): Promise<Entity>;

  /**
   * Could be overrided to enforce some conditions.
   * @param lookup
   */
  getQueryConditions(
    lookup?: Entity[LookupField],
    ...args: CustomArgs
  ): Promise<FindConditions<Entity>>;

  getRelationOptions(
    queries: QueryDto<Entity>,
    ...args: CustomArgs
  ): Promise<FindOneOptions<Entity> | FindManyOptions<Entity>>;

  /**
   * Will be called before responding the `list` result. By default it returns the
   * entities directly, override it to change its behavior.
   * @param entities
   * @param queries
   * @param args
   */
  finalizeList(
    entities: Entity[],
    queries: QueryDto<Entity>,
    ...args: CustomArgs
  ): Promise<unknown>;
}
