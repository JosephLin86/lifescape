import pool from "../db/index.js";


export async function addXp(id, amount) {
    const result = await pool.query(
        `
        UPDATE public.activities
        SET xp = xp + $1
        WHERE id = $2
        RETURNING *;
        `,
        [amount, id]
    );
    return result.rows[0];
}

export async function getActivity(name) {
    const result = await pool.query(
        `
        SELECT *
        FROM public.activities
        WHERE id = $1;
        `,
        [id]
    );
    return result.rows[0];
}