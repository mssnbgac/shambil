// Vercel serverless function entry point
import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Shambil Pride Academy API is running',
    timestamp: new Date().toISOString()
  });
});

// School content endpoint (static for now)
app.get('/api/school-content', (req, res) => {
  try {
    const content = {
      heroTitle: "Welcome to Shambil Pride Academy Birnin Gwari",
      heroSubtitle: "Excellence in Education, Character Building, and Academic Achievement",
      aboutTitle: "About Our School",
      aboutContent: "Shambil Pride Academy Birnin Gwari is a leading educational institution committed to providing quality education and nurturing young minds. We focus on academic excellence, character development, and preparing students for future success.",
      missionTitle: "Our Mission",
      missionContent: "To provide comprehensive education that develops intellectual, social, and moral capabilities of our students while fostering a love for learning and respect for others.",
      visionTitle: "Our Vision", 
      visionContent: "To be the premier educational institution in Birnin Gwari, known for academic excellence, character development, and producing well-rounded graduates who contribute positively to society.",
      contactPhone: ["+2348079387958", "+2348034012480"],
      contactEmail: "shehubala70@gmail.com",
      contactAddress: "Birnin Gwari, Kaduna State, Nigeria",
      schoolHours: "Monday - Friday: 7:00 AM - 3:00 PM"
    };
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching school content:', error);
    res.status(500).json({ message: 'Error fetching school content' });
  }
});

// Simple auth endpoint for testing
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Simple demo authentication
    const demoUsers = [
      { email: 'admin@shambil.edu.ng', password: 'admin123', role: 'admin', firstName: 'Admin', lastName: 'User' },
      { email: 'Abbas@gmail.com', password: 'student123', role: 'student', firstName: 'Abbas', lastName: 'Student' },
      { email: 'teacher@shambil.edu.ng', password: 'teacher123', role: 'teacher', firstName: 'Teacher', lastName: 'User' },
      { email: 'accountant@shambil.edu.ng', password: 'accountant123', role: 'accountant', firstName: 'Accountant', lastName: 'User' },
      { email: 'exam@shambil.edu.ng', password: 'exam123', role: 'exam_officer', firstName: 'Exam', lastName: 'Officer' }
    ];
    
    const user = demoUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Generate a simple token (in production, use proper JWT)
      const token = Buffer.from(JSON.stringify({ 
        id: user.email, 
        email: user.email, 
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      })).toString('base64');
      
      res.json({
        success: true,
        token,
        user: {
          id: user.email,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Dashboard endpoints
app.get('/api/dashboard/admin/current', (req, res) => {
  res.json({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@shambil.edu.ng',
    role: 'admin'
  });
});

app.get('/api/dashboard/student/current', (req, res) => {
  res.json({
    firstName: 'Abbas',
    lastName: 'Student',
    email: 'Abbas@gmail.com',
    role: 'student',
    admissionNumber: 'SHA/2024/001',
    className: 'JSS 1A'
  });
});

// Catch all other routes
app.all('*', (req, res) => {
  res.status(404).json({ 
    message: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

export default app;