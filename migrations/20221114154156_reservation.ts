import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('Reservation', t => {
            t.increments('ID').primary()
            t.date('ReservationDate').notNullable()
            t.boolean('Confirmed').nullable().defaultTo('false')
            t.boolean('Canceled').nullable().defaultTo('false')

            t.integer('TableID')
             .notNullable()
             .references('ID')
             .inTable('RestaurantTable')
            t.integer('UserID')
             .notNullable()
             .references('ID')
             .inTable('User')
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('Reservation')
}

