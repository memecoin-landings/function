package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type ContactFormRequest struct {
	Name      string   `json:"name" binding:"required"`
	Phone     string   `json:"phone" binding:"required"`
	Email     string   `json:"email" binding:"required,email"`
	Branding  *string  `json:"branding"`
	Services  []string `json:"services"`
	Timestamp string   `json:"timestamp"`
}

type ContactFormResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func main() {
	// Set Gin mode from environment
	if os.Getenv("GIN_MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	// CORS configuration
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{
		"http://localhost:3000",
		"https://yourdomain.com", // Replace with your actual domain
	}
	config.AllowMethods = []string{"GET", "POST", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept"}
	r.Use(cors.New(config))

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":    "healthy",
			"timestamp": time.Now().Unix(),
		})
	})

	// Contact form endpoint
	r.POST("/api/contact", handleContactForm)

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(r.Run(":" + port))
}

func handleContactForm(c *gin.Context) {
	var req ContactFormRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ContactFormResponse{
			Success: false,
			Message: "Invalid form data: " + err.Error(),
		})
		return
	}

	// Log the form submission (in production, you'd save to database/sheets)
	log.Printf("Contact form submission: %+v", req)

	// TODO: Implement your actual logic here:
	// 1. Save to Google Sheets (similar to your current lead-table.ts)
	// 2. Send email notification (similar to your email service)
	// 3. Validate and sanitize data
	// 4. Handle errors appropriately

	// For now, simulate processing
	time.Sleep(100 * time.Millisecond)

	// Example response
	c.JSON(http.StatusOK, ContactFormResponse{
		Success: true,
		Message: "Thank you for your message! We'll get back to you soon.",
	})
}

// TODO: Implement these functions based on your existing TypeScript code:
// - saveToGoogleSheets(req ContactFormRequest) error
// - sendEmailNotification(req ContactFormRequest) error