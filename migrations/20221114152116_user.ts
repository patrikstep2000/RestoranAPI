import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('UserRole', t => {
            t.increments('ID').primary()
            t.string('Name').notNullable()
        })
        .createTable('Country', t => {
            t.increments('ID').primary()
            t.string('Name').notNullable()
        })
        .createTable('City', t => {
            t.increments('ID').primary()
            t.string('Name').notNullable()

            t.integer('CountryID')
             .notNullable()
             .references('ID')
             .inTable('Country')
        })
        .createTable('User', t => {
            t.increments('ID').primary()
            t.string('FirstName').notNullable()
            t.string('LastName').notNullable()
            t.string('Email').notNullable()
            t.string('Password').notNullable()

            t.integer('CityID')
             .notNullable()
             .references('ID')
             .inTable('City')
            t.integer('RoleID')
             .notNullable()
             .references('ID')
             .inTable('UserRole')
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('User')
        .dropTable('City')
        .dropTable('Country')
        .dropTable('UserRole')
}

