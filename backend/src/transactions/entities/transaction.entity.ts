import { ECurrency } from '@types';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public date: Date;

  @Column({ type: 'decimal', scale: 2 })
  public amount: number;

  @Column({
    type: 'enum',
    enum: ECurrency,
    default: ECurrency.USD,
  })
  public currency: ECurrency;

  // This should be a foreign key for the clients table in a real world application
  @Column()
  public client_id: number;
}
