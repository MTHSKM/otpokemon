import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pokemons', schema: 'otpokemon' })
export class Pokemons {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  sell_price_free: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  sell_price_vip: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
