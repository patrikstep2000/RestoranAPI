import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user_role", t => {
                t.increments("id").primary(),
                t.string("name").notNullable()
            })
            .createTable("user", t => {
                t.increments("id").primary(),
                t.string("first_name").notNullable(),
                t.string("last_name").notNullable(),
                t.string("email").notNullable(),
                t.string("password").notNullable(),
                t.integer("role_id")
                 .nullable()
                 .references("id")
                 .inTable("user_role")
            }) .createTable('password_reset',k=>
            {
                k.string("reset_code"),
                k.integer("UserID").references("id").inTable("user");
            }
            )
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("password_reset").dropTable("user").dropTable("user_role");
}

