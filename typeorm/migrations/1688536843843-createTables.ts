import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1688536843843 implements MigrationInterface {
  name = 'CreateTables1688536843843';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "meetups" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, "location" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "tags" character varying array NOT NULL DEFAULT ARRAY[]::varchar[], "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a9fcbc9b139c5daef2334f54cf" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "meetup_registrations" ("id" SERIAL NOT NULL, "registration_date" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "meetup_id" integer, CONSTRAINT "PK_029229b301e782dfdb799903581" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "meetup_registrations" ADD CONSTRAINT "FK_615e130f450b9c4fbf0b1f51675" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "meetup_registrations" ADD CONSTRAINT "FK_aff24320d7de17de9e3af928d89" FOREIGN KEY ("meetup_id") REFERENCES "meetups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "meetup_registrations" DROP CONSTRAINT "FK_aff24320d7de17de9e3af928d89"');
    await queryRunner.query('ALTER TABLE "meetup_registrations" DROP CONSTRAINT "FK_615e130f450b9c4fbf0b1f51675"');
    await queryRunner.query('DROP TABLE "meetup_registrations"');
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TABLE "meetups"');
  }
}
