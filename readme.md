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

## 💻 Technologies Used

- **Frontend:** React.js,TailwindCSS, Framer motion, Redux Toolkit, Redux Toolkit(for state changes) Query(for fetching and mutation),Tanstack Table(advanced table searching) and axios
- **Backend:** Node.js, Express.js,nodemailer
- **Database:** MongoDB
- **Authentication:** JWT, OAuth 
- **Messaging:** socket.io
- **CV Builder:** html2pdf.js
- **Deployment:** Render(for server) , Netlify(client-side) 
- **Payment intrigration:** Paypal,webhook-Paypal etc .



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