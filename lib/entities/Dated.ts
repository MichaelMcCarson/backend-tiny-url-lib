import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Dated extends BaseEntity {
  @CreateDateColumn({
    insert: false,
    update: false,
  })
  readonly createdAt: Date;

  @UpdateDateColumn({
    select: false,
    insert: false,
    update: false,
  })
  readonly updatedAt: Date;
}
