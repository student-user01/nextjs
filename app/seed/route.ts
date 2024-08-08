import { db } from "@vercel/postgres";


// const likes = 100;
async function testDb(client:any) {
  console.log("TABLE CREATED");
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
  await client.sql`CREATE TABLE IF NOT EXISTS posts(
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
likes VARCHAR(10) NOT NULL);`;

  // const rows = sql`SELECT * FROM posts;`;

  // const insertedRevenue = await Promise.all((await rows).rows);
  console.log("TABLE CREATED");
  // return insertedRevenue;
}
export async function GET() {
  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    console.log("TABLE CREATED");
    await testDb(client);
    await client.sql`COMMIT`;
    return Response.json({ message: "DATABASE CONNECTED..." }, { status: 200 });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
