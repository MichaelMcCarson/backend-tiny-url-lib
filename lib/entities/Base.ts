import { PrimaryGeneratedColumn } from 'typeorm';
import { Dated } from './Dated';

export abstract class Base extends Dated {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
