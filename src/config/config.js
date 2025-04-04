import { config } from 'dotenv';

config();

//Configuración para conectarse a railway:
export const PORT = process.env.PORT || 4000

export const DB_USER = process.env.DB_USER || "root"
export const DB_PASSWORD = process.env.DB_PASSWORD || "zrkIkFRVFLdmDkJlkateIbLYQivFUnZh"
export const DB_HOST = process.env.DB_HOST || "yamanote.proxy.rlwy.net"
export const DB_DATABASE = process.env.DB_DATABASE || "railway"
export const DB_PORT = process.env.DB_PORT || 43697
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "tokenrandom";


//Configuración para conectarse local, sustituyan a sus variables de entorno mis panas:

// export const PORT = process.env.PORT || 4000

// export const DB_USER = process.env.DB_USER || "jonathan"
// export const DB_PASSWORD = process.env.DB_PASSWORD || "admin"
// export const DB_HOST = process.env.DB_HOST || "localhost"
// export const DB_DATABASE = process.env.DB_DATABASE || "sp_dataa"
// export const DB_PORT = process.env.DB_PORT || 3307
// export const TOKEN_SECRET = process.env.TOKEN_SECRET || "tokenrandom";