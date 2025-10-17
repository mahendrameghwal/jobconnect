# 🌟 JobConnect 

Welcome to the JobConnect Job Portal Platform! This project is designed to connect candidates with organizations, making job searching and hiring easier than ever. Whether you're looking for your dream job or the perfect candidate, this platform has you covered.

## 🚀 Features

- **User Accounts:** Create accounts as either candidates or organizations.
- **State management:** Redux toolkit.
- **Detailed Profiles:** Both candidates and organizations can create and update detailed profiles.
- **Job Postings:** Organizations can post job openings.
- **Job Search:** Candidates can search for jobs based on preferences and qualifications.
- **Direct Applications:** Candidates can apply directly for jobs through the platform.
- **Application Review:** Organizations can review applications and select the best candidates.
- **Messaging:** Direct messaging between candidates and organizations for seamless communication.
- **Profile Updates:** Regularly update profiles to keep information current.
- **CV Builder:** Candidates can build and customize their CVs using the data within the platform if taken 
- **Subscription Plan** A user can choose a monthly or yearly subscription based on their requirements through PayPal. Additionally, users can pay using their account balance, cancel their subscription, and request a refund for their account.
- **Google Meet integration:** Generate Meet links for interviews via Google Calendar (least-privilege scopes) and optionally manage Meet spaces if enabled.

## 💻 Technologies Used

- **Frontend:** React.js,TailwindCSS, Framer motion, Redux Toolkit, Redux Toolkit(for state changes) Query(for fetching and mutation),Tanstack Table(advanced table searching) and axios
- **Backend:** Node.js, Express.js,nodemailer
- **Google APIs:** googleapis (OAuth2, Calendar/Meet APIs)
- **Database:** MongoDB
- **Authentication:** JWT, OAuth 
- **Messaging:** socket.io
- **CV Builder:** html2pdf.js
- **Deployment:** Render(for server) , Netlify(client-side) 
- **Payment intrigration:** Paypal,webhook-Paypal etc .

## 📅 Google Meet Integration

Our app uses Google OAuth scopes strictly to create and attach Google Meet links to interview events on behalf of the signed-in user, following least-privilege principles. By default we request `https://www.googleapis.com/auth/calendar.events` so we can create/update a Calendar event and ask Calendar to attach a Meet conference (`conferenceData.createRequest`). This returns a Meet URL that we surface in the product. We do not access other user data beyond what is necessary for that operation. If direct Meet space management is required, we use the narrower Meet API scopes such as `https://www.googleapis.com/auth/meetings.space.created` (create only) or `https://www.googleapis.com/auth/meetings.space` (manage), and only when those features are enabled. Users explicitly consent to scopes, tokens are stored securely, refresh tokens are requested only to maintain user-initiated functionality, and users can revoke access at any time. If scopes change in the future, users will be re-prompted for consent.

### Required scopes (choose minimal):

- `https://www.googleapis.com/auth/calendar.events` — create/update events and attach Meet links (recommended minimal)
- `https://www.googleapis.com/auth/calendar` — broader Calendar access (not recommended unless needed)
- `https://www.googleapis.com/auth/meetings.space.created` — create Meet spaces (optional)
- `https://www.googleapis.com/auth/meetings.space` — manage Meet spaces (optional)

### Setup (server)

1. Create OAuth 2.0 credentials in Google Cloud Console and set the authorized redirect URI.
2. Add the following environment variables to your server configuration:

```bash
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=https://your-server.com/api/auth/google/callback
GOOGLE_SCOPES=https://www.googleapis.com/auth/calendar.events
```

3. Ensure the server has `googleapis` installed and uses OAuth2 to obtain an access token with the scopes above.
4. When creating an interview event, call the Calendar API with `conferenceData.createRequest` to receive the Meet URL.



## 📂 Project Structure

```
jobBoard/
├── client/                # Frontend application
│   ├── public/            # Static assets
│   ├── src/               # React components and logic
│   └── README.md          # Client-specific documentation
├── server/               # Backend application
│   ├── controllers/       # Business logic handlers
│   ├── models/            # Database models
│   ├── routes/            # API endpoints
│   └── utils/             # Utility functions
├── readme.md              # Main project documentation
└── ...
```

# Clone the repository
```bash
git clone https://github.com/mahendrameghwal/jobconnect.git
```

# Test Account Credentials (for testing purposes only)
```bash
echo "Test Account Credentials:"
echo "Email: candidate1@gmail.com"
echo "Password: candidate1"
```

# Test Account Credentials (for payment only)
```bash
echo "Email: sb-g443ej32524960@personal.example.com"
echo "Password: ,)PHF6Ph"
```