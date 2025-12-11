"use server"
import { pool } from "@/src/lib/db";

export async function checkAdmin(uid: string) {

  const result = await pool.query(
    `SELECT uid FROM users WHERE is_admin=1`
  );

  const isAdmin = result.rows.some(row => row.uid === uid);

  return isAdmin;
}

export async function listReviewAdmin() {
  const result = await pool.query(
    `SELECT id, place_name AS "placeName"
      FROM places
      WHERE stato = 0
      ORDER BY data_accettazione DESC, id DESC`
  );

  return result.rows;
}

export async function listAcceptedAdmin() {
  const result = await pool.query(
    `SELECT id, place_name AS "placeName"
      FROM places
      WHERE stato = 2
      ORDER BY data_accettazione DESC, id DESC`
  );

  return result.rows;
}