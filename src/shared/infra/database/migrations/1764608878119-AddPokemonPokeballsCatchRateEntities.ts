import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPokemonPokeballsCatchRateEntities1764608878119 implements MigrationInterface {
  name = 'AddPokemonPokeballsCatchRateEntities1764608878119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "otpokemon"."pokemons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "sell_price_free" numeric(15,2) NOT NULL DEFAULT '0', "sell_price_vip" numeric(15,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6279b90a07056c862e5c649e0a3" UNIQUE ("slug"), CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "otpokemon"."pokeballs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "price_free" numeric(10,2) NOT NULL DEFAULT '0', "price_vip" numeric(10,2) NOT NULL DEFAULT '0', "catch_rate_multiplier" numeric(5,2) NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_49fd2ecc4abf508d64a33983a3c" UNIQUE ("slug"), CONSTRAINT "PK_6cf060697dad222828fa89f81a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "otpokemon"."catch_attempts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pokemon_id" uuid NOT NULL, "pokeball_id" uuid NOT NULL, "total_throws" integer NOT NULL DEFAULT '0', "total_catches" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_623f4e4f9d03c04c635c45b3832" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "otpokemon"."catch_attempts" ADD CONSTRAINT "FK_e93f221db676bd79ccd002dd28c" FOREIGN KEY ("pokemon_id") REFERENCES "otpokemon"."pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "otpokemon"."catch_attempts" ADD CONSTRAINT "FK_f7a66c71588324ea01eeee99776" FOREIGN KEY ("pokeball_id") REFERENCES "otpokemon"."pokeballs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otpokemon"."catch_attempts" DROP CONSTRAINT "FK_f7a66c71588324ea01eeee99776"`,
    );
    await queryRunner.query(
      `ALTER TABLE "otpokemon"."catch_attempts" DROP CONSTRAINT "FK_e93f221db676bd79ccd002dd28c"`,
    );
    await queryRunner.query(`DROP TABLE "otpokemon"."catch_attempts"`);
    await queryRunner.query(`DROP TABLE "otpokemon"."pokeballs"`);
    await queryRunner.query(`DROP TABLE "otpokemon"."pokemons"`);
  }
}
