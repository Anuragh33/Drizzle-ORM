import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const UserRole = pgEnum('userRole', ['ADMIN', 'BASIC'])

export const UserTable = pgTable(
  'user',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    age: integer('age').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    role: UserRole('userRole').notNull().default('BASIC'),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex('emailIndex').on(table.email),
      uniqueName: unique('uniqueName').on(table.name),
    }
  }
)

export const UserPreferences = pgTable('userPreferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  emailupdates: boolean('emailUpdates').notNull().default(true),
  userId: uuid('userId')
    .references(() => UserTable.id)
    .notNull(),
})

export const PostTable = pgTable('postTable', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  averageRating: real('averageRatings').notNull().default(0),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  authorId: uuid('authorId')
    .references(() => UserTable.id)
    .notNull(),
})

export const CategoryTable = pgTable('categoryTable', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
})

export const PostCategoryTable = pgTable(
  'postCategorytable',
  {
    postid: uuid('postId')
      .references(() => PostTable.id)
      .notNull(),
    categoryId: uuid('categoryId')
      .references(() => CategoryTable.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.categoryId, table.postid] }),
    }
  }
)

//Relations

export const UserTableRelations = relations(UserTable, ({ one, many }) => {
  return {
    preferences: one(UserPreferences),
    posts: many(PostTable),
  }
})

export const UserPreferenceRelations = relations(
  UserPreferences,
  ({ one, many }) => {
    return {
      user: one(UserTable, {
        fields: [UserPreferences.userId],
        references: [UserTable.id],
      }),
    }
  }
)

export const PostTableRelations = relations(PostTable, ({ one, many }) => {
  return {
    author: one(UserTable, {
      fields: [PostTable.authorId],
      references: [UserTable.id],
    }),
    postCatrgory: many(PostCategoryTable),
  }
})
