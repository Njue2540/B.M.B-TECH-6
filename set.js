const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE80LzhxL0IvOWs4a2ZNTjZBcTBMd3NubytGbm8ybGZzeHVsVEszaWMxdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnVjRzBNa1QyWlFSVFN0L2kvb1FRR3d5L2hXZG9ndWVXY3ZKUzFvVEgzbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1QUp2NWNDZVBDalpTd2tTQ090Y0lBSkNzYzJib2ErUmJ4clozcm1TTzBFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKclRURUQ1Nmo5L2tvaVlwLzZzUUVPM2xHQW9VbXBlS0lWY1lnekRnZFNzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBJT3pIT1dBZkM3OG1ZbjNNN05JQlo2MnI0L3hDdys5UkIrVy90bTQ2M0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijk4YW11bzB3QXZ2VW5valkrY0Yxbm9CMVFVWGZ1YkZHaVMzektVWEt1R009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0J5NnV6RjhMSGZoclNSWDdpKzV6OEhQOHg4b0ZPcUxldFNzUnQ3cmMxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYTZVTmdMTUJyMURjQTVBbXpLMTFTQ3JZV0szdzdBNlg1TE9HSGdsNnNpaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBRbmdTd1U5WndIaDBRTjRLbnNwQjQrM3N2dm5yVFNnbUI5R0F3R3ZkTTducFdZWFJueFF5Y0ZrMHBzTnZ0TDRJdW9MTFFqUWxMSVhXZmpZZFJHL0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY2LCJhZHZTZWNyZXRLZXkiOiJ6cTY0SVZ2bnovUHo1bFE1Um4zL0JqVHpjc3g3M1RaVHpDNlJxem9rbm4wPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc0MjczNTE1OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJEQzE1RThGNUFFM0Q4M0ZBRDE5Q0Y2NDg5NjhFQjQ1NCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwMjU5NTg1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NDI3MzUxNTlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOUU4RkU5ODZBREMwNzQ3MUI2MjM1QTIyMUEyMEYwNEEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDI1OTU4NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzQyNzM1MTU5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkU2OTVCNTA0NTE2OUI5ODI0NDJGQzQ4RUFBMThCNUIzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTAyNTk2MzF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6dHJ1ZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiNTdaQUFMTDciLCJtZSI6eyJpZCI6IjI1NDc0MjczNTE1OTo0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImJhdGlzdHV0YSIsImxpZCI6IjE5ODY4NTgyNDY3NTg3NTo0QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWZIeE13QkVPK3V5OElHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoia2pSU0xDZnlkK3Q5ZnBibU9VdWlKdXFnQXI4c1pMb2NhUnd3UFhoQkUydz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNXZXWUpRT2FBU2I1V05qNlVwS2pOOEZvNDlnVllKeng5L3ZMYmdRblJiN2x0S2VBMEx4cmxsZ2YydE5sNkNyZ1o0SnlNUWZWclpQNlNBKzlzVTJ0Q2c9PSIsImRldmljZVNpZ25hdHVyZSI6ImxPa1ZwZk1XZ055RndycFpWSVoxOWYvYWVWWTVjSE9SdGd4aS9BZW40bTVCUXVhU3BidzIvUlJQV3pDMDd5bjBsMnV2bHU3Vi9oSnFlSVVlVzduY0FRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzQyNzM1MTU5OjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWkkwVWl3bjhuZnJmWDZXNWpsTG9pYnFvQUsvTEdTNkhHa2NNRDE0UVJOcyJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUwMjU5NTgxLCJsYXN0UHJvcEhhc2giOiJQV2s1QiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ3ExIn0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

