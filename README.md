# abstudia

_Abeunt studia in mores._

A personal task management web application designed to help users effectively manage their time.

```bash
node app.js
```

## Web client

The frontend lives in `client/` (React + Vite) and is served by the Express server from `client/dist`.

```bash
cd client && npm install && npm run build   # then restart `node app.js`
```

For development, run `npm run dev` in `client/` alongside `node app.js`; Vite proxies `/auth` and `/tasks` to port 3000.
