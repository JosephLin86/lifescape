import pool from "../db/index.js";


export async function addXp(id, amount) {
    const { rows } = await pool.query(
        `SELECT xp, level, xp_to_next FROM public.activities WHERE id = $1`,
        [id]
    );

    if (rows.length === 0) return null;

    let { xp, level, xp_to_next } = rows[0];

    xp += amount;

    while (xp >= xp_to_next) {
        xp -= xp_to_next;
        level += 1;
        xp_to_next = Math.floor(xp_to_next * 1.2);
    }
    
    
    
    
    const result = await pool.query(
        `
        UPDATE public.activities
        SET xp = $1,
            level = $2,
            xp_to_next = $3
        WHERE id = $4
        RETURNING
        id,
        name,
        xp,
        level,
        xp_to_next AS "xpToNext";
        `,
        [xp, level, xp_to_next, id]
    );
    return result.rows[0];
}

export async function getActivity(id) {
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

export async function getAllActivities() {
    const result = await pool.query(
        `
        SELECT id, name, xp, level, xp_to_next
        FROM public.activities
        ORDER BY id;
        `
    );
    return result.rows
}