import 'dotenv/config'

import { db } from './drizzle/db'
import { UserTable } from './drizzle/schema'
import { Column } from 'drizzle-orm'

async function hello() {
  //Insert data into the table

  // await db.delete(UserTable)
  // const user = await db
  //   .insert(UserTable)
  //   .values([
  //     {
  //       name: 'Anuragh',
  //       age: 25,
  //       email: 'test123@gmail.com',
  //     },
  //     {
  //       name: 'jai',
  //       age: 41,
  //       email: 'test@gmail.com',
  //     },
  //   ])
  //   .returning({
  //     id: UserTable.id,
  //   })

  // console.log(user)

  //select data from the table
  const users = await db.query.UserTable.findMany({
    columns: { email: true },
    with: { preferences: true },
  })

  console.log(users)
}

hello()
