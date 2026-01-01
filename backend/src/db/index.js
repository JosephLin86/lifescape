import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "lifescape",
    password: "lifescape_pw",
    database: "lifescape",
});

export default pool;