import {neon} from "@neondatabase/serverless";
import dotenv from 'dotenv';

dotenv.config();

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env

//creates a SQL connection using environment variables
export const sql = neon(
  `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

//this SQL function is used as a tagged template literal, which allows us to write SQL queries safely

//postgresql://neondb_owner:npg_9o4ItXGAspnj@ep-wild-water-a5stqj6y-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require