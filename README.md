# Healing Minds – Auth + Firestore + Crisis Support + Global Chat Button

Vite + React frontend, Express + LangChain + OpenAI backend, Firebase Auth + Firestore.

Key extras in this version:
- Global floating Chat button on every page.
- Added Account Feature from firebase.
- Logout button in the nav when signed in.
- Chat page shows a greeting message using the logged-in user's name.
- Chat and journal entries are saved per user in Firestore.
- Crisis support page is public and linked from chat.

## Install dependencies

From project root:

```bash
npm install
cd server
npm install
cd ..
```

(Use the same commands in PowerShell.)

## Configure Firebase

In `src/config/firebaseClient.js`, replace the placeholder values with your Firebase web config.
(currently using a dup db)
Enable in Firebase console:
- **Authentication → Email/Password**
- **Firestore Database**

## Configure OpenAI (optional)

Create `.env` in the project root:

```env
OPENAI_API_KEY=sk-xxxxx
PORT=5000
```

If you skip this, the chat still responds with a demo message from the server.

## Run the app

Backend (in one terminal):

```bash
npm run dev:server
```

Frontend (in another terminal):

```bash
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

If you see an error in the chat like
“Something went wrong talking to the chat server…”
check that:
1. `npm run dev:server` is running, and
2. your `OPENAI_API_KEY` (if provided) is valid.
