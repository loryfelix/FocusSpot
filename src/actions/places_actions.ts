"use server"
import { pool } from "@/src/lib/db";

export async function aggiungiLuogo(id: any, user: any, formData: any, openingHours: any) {
    const stato = user.isAdmin ? 2 : 0;

    if (!user) return { success: false, error: "Utente non esistente" };

    let result;
    if (id == "new") {

        result = await pool.query(
            `INSERT INTO places (
                place_name,
                place_description,
                place_lat,
                place_long,
                has_free_wifi,
                has_power_sockets,
                has_air,
                has_heating,
                has_ticket,
                uid,
                stato,
                data_accettazione,
                opening_hours
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
            [
                formData.placeName,
                formData.description,
                formData.placeLat,
                formData.placeLong,
                formData.hasFreeWifi,
                formData.hasPowerSockets,
                formData.hasAir,
                formData.hasHeating,
                formData.hasTicket,
                user.uid,
                stato,
                new Date(),
                JSON.stringify(openingHours)
            ]
        );

    } else if (user.isModerator == 1) {

        result = await pool.query(
            `UPDATE places
            SET
                place_name = $1,
                place_description = $2,
                place_lat = $3,
                place_long = $4,
                has_free_wifi = $5,
                has_power_sockets = $6,
                has_air = $7,
                has_heating = $8,
                has_ticket = $9,
                stato = $10,
                data_accettazione = $11,
                opening_hours = $12
            WHERE id = $13`,
            [
                formData.placeName,
                formData.description,
                formData.placeLat,
                formData.placeLong,
                formData.hasFreeWifi,
                formData.hasPowerSockets,
                formData.hasAir,
                formData.hasHeating,
                formData.hasTicket,
                stato,
                new Date(),
                JSON.stringify(openingHours), // converti in JSONB
                id
            ]
        );

    }

    if (result) {
        if (user.isAdmin == 0) {
            // TODO: send email
            return { success: true };
        } else {
            return { success: true };
        }
    } else {
        return { success: false, error: "Errore del database" };
    }

}

export async function getPlaceFromId(id: any) {
    const result = await pool.query(
        `SELECT 
            place_name,
            place_description,
            place_lat,
            place_long,
            has_free_wifi,
            has_power_sockets,
            has_air,
            has_heating,
            has_ticket,
            opening_hours
         FROM places
         WHERE id = $1`,
        [id]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    return {
        formData: {
            placeName: row.place_name,
            description: row.place_description,
            placeLat: row.place_lat,
            placeLong: row.place_long,
            hasFreeWifi: row.has_free_wifi,
            hasPowerSockets: row.has_power_sockets,
            hasAir: row.has_air,
            hasHeating: row.has_heating,
            hasTicket: row.has_ticket,
        },
        openingHours: row.opening_hours
    };
}