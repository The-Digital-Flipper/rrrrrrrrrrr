# AI Switchboard - Vercel Fixed

Upload these files to the ROOT of your GitHub repo:

- index.html
- login.html
- vercel.json

Vercel settings:
- Framework Preset: Other
- Build Command: leave blank
- Output Directory: leave blank or .
- Install Command: leave blank

Important:
Do not put these files inside another folder unless your Vercel Root Directory is set to that folder.

---

## Google OAuth Setup

The "Log In" button uses Google Sign-In. Follow these steps to activate it:

### 1. Create a Google OAuth Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. Choose **Web application** as the application type
6. Under **Authorized JavaScript origins**, add your site's URL — for example:
   - `https://your-project.vercel.app`
   - `http://localhost` (for local testing)
7. Click **Create** and copy the **Client ID**

### 2. Add the Client ID to login.html

Open `login.html` and find this line:

```
data-client_id="YOUR_GOOGLE_CLIENT_ID"
```

Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID, for example:

```
data-client_id="123456789-abcdef.apps.googleusercontent.com"
```

### 3. Deploy

Push the updated files to GitHub. Vercel will redeploy automatically.

Users can now click **Log In**, sign in with their Google account, and see their name and avatar in the header. Clicking **Log Out** clears the session.
