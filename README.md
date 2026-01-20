# T2 Support Agent - Web Client

A SvelteKit-based web client for the T2 Support Agent AI assistant.

## Getting Started

1. Install dependencies:
```sh
npm install
```

2. Copy the environment example and configure:
```sh
cp .env.example .env
```

3. Start the development server:
```sh
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL. Leave empty for local dev (uses Vite proxy). |
| `VITE_AUTH0_DOMAIN` | Your Auth0 tenant domain (e.g., `your-tenant.auth0.com`) |
| `VITE_AUTH0_CLIENT_ID` | Auth0 Application Client ID |
| `VITE_AUTH0_AUDIENCE` | Auth0 API Identifier/Audience |

## Auth0 Setup

### 1. Create an Auth0 Account
Go to [auth0.com](https://auth0.com) and sign up for a free account.

### 2. Create a Single Page Application
1. Go to **Applications > Create Application**
2. Choose **Single Page Web Applications**
3. Select **SvelteKit** (or JavaScript)
4. Note the **Domain** and **Client ID**

### 3. Configure Application Settings
In your Auth0 Application settings:

- **Allowed Callback URLs**: `http://localhost:5173, https://your-vercel-app.vercel.app`
- **Allowed Logout URLs**: `http://localhost:5173, https://your-vercel-app.vercel.app`
- **Allowed Web Origins**: `http://localhost:5173, https://your-vercel-app.vercel.app`

### 4. Create an API (for backend)
1. Go to **Applications > APIs > Create API**
2. Set a **Name** (e.g., "T2 Support Agent API")
3. Set an **Identifier** (e.g., `https://t2-support-agent/api`)
4. This identifier is your `VITE_AUTH0_AUDIENCE`

### 5. Configure the Backend
In your backend `appsettings.json` or environment:
```json
{
  "Auth0": {
    "Domain": "your-tenant.auth0.com",
    "Audience": "https://t2-support-agent/api"
  }
}
```

### 6. Configure API Key for Bots (Optional)
For WhatsApp/Slack integrations that use API key authentication:
```json
{
  "ApiKeys": {
    "BotApiKey": "your-secure-api-key"
  }
}
```

Bots should send this key in the `X-API-Key` header.

## Building

```sh
npm run build
```

Preview the production build:
```sh
npm run preview
```

## Deployment

This app is configured for Vercel. Push to your repository and Vercel will auto-deploy.

Set the environment variables in your Vercel project settings.
