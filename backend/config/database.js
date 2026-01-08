import pkg from 'pg';
const { Pool } = pkg;

export let db;

export async function conectarDB() {
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const res = await db.query("SELECT NOW()");
    console.log("Conexion correcta, hora del servidor:", res.rows[0].now);
  } catch (error) {
    console.error("No se pudo conectar a la DB");
    console.error("Error:", error.message);
    
    process.exit(1); 
  }
}