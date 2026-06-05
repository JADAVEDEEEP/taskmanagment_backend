<<<<<<< HEAD
# Task Management API

Node.js + Express backend for the MERN Task Management application.

## Local Setup

```bash
npm install
npm run dev
```

Create `.env` in this folder:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

## Deployment

Recommended platform: Render.

Render settings:

```txt
Root Directory: node_backend
Build Command: npm install
Start Command: npm start
```

Environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend-url.com
```

After deployment, open the backend URL. It should return:

```json
{ "message": "Task Management API is running" }
```
=======
# taskmanagment_backend
>>>>>>> 9d8874fe3e8601d66b01aae074799307f2c7f523
