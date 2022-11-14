import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('Restaurant', t => {
            t.increments('ID').primary()
            t.string('Name').notNullable()
            
            t.integer('CityID')
             .notNullable()
             .references('ID')
             .inTable('City')
        })
        .createTable('Ingredient', t => {
            t.increments('ID').primary()
            t.string('Name')
        })
        .createTable('Meal', t => {
            t.increments('ID').primary()
            t.string('Name').notNullable()
            t.double('Price').notNullable()
            t.integer('Size').nullable()
        })
        .createTable('MealIngredient', t => {
            t.integer('Amount').notNullable()

            t.integer('MealID')
             .notNullable()
             .references('ID')
             .inTable('Meal')
            t.integer('IngredientID')
             .notNullable()
             .references('ID')
             .inTable('Ingredient')
        })
        .createTable('RestaurantMeal', t => {
            t.integer('MealID')
            .notNullable()
            .references('ID')
            .inTable('Meal')
           t.integer('RestaurantID')
            .notNullable()
            .references('ID')
            .inTable('Restaurant')
        })
        .createTable('RestaurantTable', t => {
            t.increments('ID').primary()
            t.integer('NumOfChairs').notNullable()
            t.integer('RestaurantID')
             .notNullable()
             .references('ID')
             .inTable('Restaurant')
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('RestaurantTable')
        .dropTable('RestaurantMeal')
        .dropTable('MealIngredient')
        .dropTable('Meal')
        .dropTable('Ingredient')
        .dropTable('Restaurant')
}

