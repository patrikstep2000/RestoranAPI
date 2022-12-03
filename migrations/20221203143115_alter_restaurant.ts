import { Knex } from "knex";
import { TABLES } from "../src/constants/Tables";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable("Tag", t => {
            t.increments("ID").primary(),
            t.string("Name").notNullable()
        })
        .alterTable(TABLES.RESTAURANT, t => {
            t.text("Details").nullable()
            t.string("ShortDetails").nullable()
            t.integer("TagID")
             .notNullable()
             .references("ID")
             .inTable("Tag")
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLES.RESTAURANT, t => {
        t.dropColumn("TagID")
    }).dropTable("Tag")
}

