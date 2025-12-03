import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pokeballs', schema: 'otpokemon' })
export class Pokeballs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price_free: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price_vip: number;

  @Column('decimal', { precision: 5, scale: 2, default: 1.0 })
  catch_rate_multiplier: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
