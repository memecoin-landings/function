# Contact Form API Server

This is a simple Go API server for handling contact form submissions from the static frontend.

## Quick Start

```bash
cd api-server
go mod init contact-api
go get github.com/gin-gonic/gin
go get github.com/gin-contrib/cors
go run main.go
```

## Environment Variables

Create a `.env` file:

```env
PORT=8080
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_CREDENTIALS_PATH=./credentials.json
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_TO=recipient@example.com
```

## Deploy

### Docker
```bash
docker build -t contact-api .
docker run -p 8080:8080 contact-api
```

### Railway
```bash
railway login
railway init
railway up
```

### DigitalOcean App Platform
- Connect to GitHub repo
- Set environment variables
- Deploy

The server handles:
- CORS for your frontend domain
- Contact form submissions
- Google Sheets integration
- Email notifications
- Health check endpoint

Frontend will fall back to localStorage if API is unavailable.