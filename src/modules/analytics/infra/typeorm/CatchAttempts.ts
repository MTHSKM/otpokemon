import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pokemons } from '../../../catalog/infra/typeorm/Pokemons';
import { Pokeballs } from '../../../catalog/infra/typeorm/Pokeballs';

@Entity({ name: 'catch_attempts', schema: 'otpokemon' })
export class CatchAttempts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pokemon_id: string;

  @ManyToOne(() => Pokemons)
  @JoinColumn({ name: 'pokemon_id' })
  pokemon: Pokemons;

  @Column()
  pokeball_id: string;

  @ManyToOne(() => Pokeballs)
  @JoinColumn({ name: 'pokeball_id' })
  pokeball: Pokeballs;

  @Column('int', { default: 0 })
  total_throws: number;

  @Column('int', { default: 0 })
  total_catches: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
