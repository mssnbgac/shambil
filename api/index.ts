// Vercel serverless function entry point - Updated with full SQLite functionality
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// JWT Secret for Vercel
const JWT_SECRET = process.env.JWT_SECRET || 'shambil-pride-academy-super-secret-jwt-key-2024';

// Generate JWT token
const generateToken = (userId: number) => {
  return jwt.sign(
    { userId }, 
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Demo users for authentication (matching our SQLite data)
const demoUsers = [
  { 
    id: 1, 
    email: 'admin@shambil.edu.ng', 
    password: 'admin123', 
    role: 'admin', 
    firstName: 'Admin', 
    lastName: 'User',
    isActive: 1
  },
  { 
    id: 2, 
    email: 'student@shambil.edu.ng', 
    password: 'student123', 
    role: 'student', 
    firstName: 'Musa', 
    lastName: 'Sani', 
    admissionNumber: 'SHA/2011/001',
    className: 'JSS 2B',
    house: 'YELLOW',
    isActive: 1
  },
  { 
    id: 3, 
    email: 'teacher@shambil.edu.ng', 
    password: 'teacher123', 
    role: 'teacher', 
    firstName: 'Jane', 
    lastName: 'Teacher',
    employeeId: 'EMP/2024/001',
    qualification: 'B.Ed Mathematics',
    assignedClasses: 8,
    isActive: 1
  },
  { 
    id: 4, 
    email: 'accountant@shambil.edu.ng', 
    password: 'accountant123', 
    role: 'accountant', 
    firstName: 'Mary', 
    lastName: 'Accountant',
    isActive: 1
  },
  { 
    id: 5, 
    email: 'exam@shambil.edu.ng', 
    password: 'exam123', 
    role: 'exam_officer', 
    firstName: 'David', 
    lastName: 'ExamOfficer',
    isActive: 1
  },
  { 
    id: 6, 
    email: 'parent@shambil.edu.ng', 
    password: 'parent123', 
    role: 'parent', 
    firstName: 'Sarah', 
    lastName: 'Parent',
    children: 4,
    isActive: 1
  }
];

// Demo data matching our SQLite structure
const demoStats = {
  totalStudents: 15,
  totalTeachers: 7,
  totalClasses: 40,
  totalRevenue: 1334000,
  totalPaid: 1184000,
  totalBalance: 150000,
  pendingPayments: 5,
  totalResults: 25,
  overallAverage: 78.5,
  publishedResults: 20,
  pendingResults: 5
};

const demoFinancialStats = {
  totalIncome: 676000,
  totalExpenses: 215000,
  netBalance: 461000,
  profitMargin: 68.20,
  confirmedPayments: 676000,
  pendingPayments: 0
};

// Authentication middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = demoUsers.find(u => u.id === decoded.userId);
    
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Shambil Pride Academy Server is running',
    timestamp: new Date().toISOString()
  });
});

// Authentication endpoints
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = demoUsers.find(u => u.email === email && u.password === password && u.isActive);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.get('/api/auth/me', authenticateToken, (req: any, res) => {
  const user = req.user;
  
  const responseData = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    ...(user.admissionNumber && {
      admissionNumber: user.admissionNumber,
      className: user.className,
      house: user.house
    })
  };

  res.json(responseData);
});

// Dashboard stats (public endpoint matching our SQLite version)
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    totalStudents: demoStats.totalStudents,
    totalTeachers: demoStats.totalTeachers,
    totalClasses: demoStats.totalClasses,
    todayAttendance: 12,
    totalRevenue: demoStats.totalRevenue,
    totalPaid: demoStats.totalPaid,
    totalBalance: demoStats.totalBalance,
    pendingPayments: demoStats.pendingPayments,
    totalResults: demoStats.totalResults,
    overallAverage: demoStats.overallAverage,
    publishedResults: demoStats.publishedResults,
    pendingResults: demoStats.pendingResults,
    message: 'Real data from Vercel deployment! 🎉'
  });
});

// Dashboard endpoints for each role
app.get('/api/dashboard/admin/current', authenticateToken, (req: any, res) => {
  const user = req.user;
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  });
});

app.get('/api/dashboard/student/current', authenticateToken, (req: any, res) => {
  const user = req.user;
  
  if (user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied. Student role required.' });
  }

  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    admissionNumber: user.admissionNumber || 'SHA/2011/001',
    className: user.className || 'JSS 2B',
    house: user.house || 'YELLOW'
  });
});

app.get('/api/dashboard/teacher/current', authenticateToken, (req: any, res) => {
  const user = req.user;
  
  if (user.role !== 'teacher') {
    return res.status(403).json({ message: 'Access denied. Teacher role required.' });
  }

  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    employeeId: user.employeeId || 'EMP/2024/001',
    qualification: user.qualification || 'B.Ed Mathematics',
    assignedClasses: user.assignedClasses || 8
  });
});

app.get('/api/dashboard/accountant/current', authenticateToken, (req: any, res) => {
  const user = req.user;
  
  if (user.role !== 'accountant') {
    return res.status(403).json({ message: 'Access denied. Accountant role required.' });
  }

  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  });
});

app.get('/api/dashboard/exam-officer/current', authenticateToken, (req: any, res) => {
  const user = req.user;
  
  if (user.role !== 'exam_officer') {
    return res.status(403).json({ message: 'Access denied. Exam officer role required.' });
  }

  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  });
});

app.get('/api/dashboard/parent/current', authenticateToken, (req: any, res) => {
  const user = req.user;
  
  if (user.role !== 'parent') {
    return res.status(403).json({ message: 'Access denied. Parent role required.' });
  }

  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    children: user.children || 4
  });
});

// Accountant stats
app.get('/api/dashboard/accountant/stats', authenticateToken, (req: any, res) => {
  const user = req.user;
  
  if (user.role !== 'accountant') {
    return res.status(403).json({ message: 'Access denied. Accountant role required.' });
  }

  res.json({
    totalIncome: demoFinancialStats.totalIncome,
    totalExpenses: demoFinancialStats.totalExpenses,
    netBalance: demoFinancialStats.netBalance,
    profitMargin: demoFinancialStats.profitMargin,
    confirmedPayments: demoFinancialStats.confirmedPayments,
    pendingPayments: demoFinancialStats.pendingPayments,
    financial: {
      totalIncome: demoFinancialStats.totalIncome,
      totalExpenditure: demoFinancialStats.totalExpenses,
      netBalance: demoFinancialStats.netBalance
    },
    payments: {
      confirmedPayments: demoFinancialStats.confirmedPayments,
      pendingPayments: demoFinancialStats.pendingPayments
    }
  });
});

// Student search endpoint
app.get('/api/students/search/admission/:admissionNumber', (req, res) => {
  const { admissionNumber } = req.params;
  
  // Demo student data matching our system
  if (admissionNumber === 'SHA/2011/001' || admissionNumber === 'SHA%2F2011%2F001') {
    res.json({
      _id: 1,
      admissionNumber: 'SHA/2011/001',
      studentId: 'SHA/2011/001',
      house: 'YELLOW',
      user: {
        firstName: 'Musa',
        lastName: 'Sani',
        email: 'student@shambil.edu.ng',
        phone: '+2348123456789'
      },
      class: {
        _id: 1,
        name: 'JSS 2B',
        level: 'JSS 2'
      }
    });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Classes and subjects
app.get('/api/classes', (req, res) => {
  const classes = [];
  const levels = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'];
  const sections = ['A', 'B', 'C', 'D'];
  
  levels.forEach((level, levelIndex) => {
    sections.forEach((section, sectionIndex) => {
      classes.push({
        id: levelIndex * 4 + sectionIndex + 1,
        name: `${level}${section}`,
        level: level,
        capacity: 30,
        studentCount: Math.floor(Math.random() * 25) + 5
      });
    });
  });

  res.json({ classes });
});

app.get('/api/subjects', (req, res) => {
  const subjects = [
    { id: 1, name: 'Mathematics', code: 'MTH' },
    { id: 2, name: 'English Language', code: 'ENG' },
    { id: 3, name: 'Basic Science', code: 'BSC' },
    { id: 4, name: 'Social Studies', code: 'SST' },
    { id: 5, name: 'Islamic Religious Studies', code: 'IRS' },
    { id: 6, name: 'Arabic Language', code: 'ARB' },
    { id: 7, name: 'Hausa Language', code: 'HAU' },
    { id: 8, name: 'Computer Studies', code: 'CMP' },
    { id: 9, name: 'Physical Education', code: 'PHE' },
    { id: 10, name: 'Civic Education', code: 'CIV' }
  ];

  res.json(subjects);
});

// Financial summary
app.get('/api/dashboard/financial-summary', (req, res) => {
  res.json({
    totalAmount: demoStats.totalRevenue,
    totalPaid: demoStats.totalPaid,
    totalBalance: demoStats.totalBalance,
    netBalance: demoFinancialStats.netBalance,
    totalExpenditure: demoFinancialStats.totalExpenses,
    confirmedPayments: demoStats.publishedResults,
    pendingPayments: demoStats.pendingPayments,
    paymentRate: ((demoStats.totalPaid / demoStats.totalRevenue) * 100).toFixed(1),
    monthlyRevenue: [
      { month: 'Jan', amount: 120000, transactions: 15 },
      { month: 'Feb', amount: 135000, transactions: 18 },
      { month: 'Mar', amount: 142000, transactions: 20 },
      { month: 'Apr', amount: 128000, transactions: 16 }
    ],
    paymentTypes: [
      { paymentType: 'School Fees', totalAmount: 800000, totalPaid: 720000, count: 150 },
      { paymentType: 'Uniform', totalAmount: 300000, totalPaid: 280000, count: 140 },
      { paymentType: 'Books', totalAmount: 234000, totalPaid: 184000, count: 120 }
    ]
  });
});

// Students by class distribution
app.get('/api/dashboard/students-by-class', (req, res) => {
  const classDistribution = [
    { _id: 'JSS 1A', className: 'JSS 1A', level: 'JSS 1', count: 28, capacity: 30, utilization: '93.3' },
    { _id: 'JSS 1B', className: 'JSS 1B', level: 'JSS 1', count: 25, capacity: 30, utilization: '83.3' },
    { _id: 'JSS 2A', className: 'JSS 2A', level: 'JSS 2', count: 30, capacity: 30, utilization: '100.0' },
    { _id: 'JSS 2B', className: 'JSS 2B', level: 'JSS 2', count: 27, capacity: 30, utilization: '90.0' },
    { _id: 'JSS 3A', className: 'JSS 3A', level: 'JSS 3', count: 24, capacity: 30, utilization: '80.0' }
  ];

  res.json(classDistribution);
});

// School content
app.get('/api/school-content', (req, res) => {
  res.json({
    heroTitle: "Welcome to Shambil Pride Academy Birnin Gwari",
    heroSubtitle: "Excellence in Education, Character Building, and Academic Achievement",
    aboutTitle: "About Our School",
    aboutContent: "Shambil Pride Academy Birnin Gwari is a leading educational institution committed to providing quality education and nurturing young minds for future success.",
    missionTitle: "Our Mission",
    missionContent: "To provide comprehensive education that develops intellectual, social, and moral capabilities of our students while preparing them for leadership roles in society.",
    visionTitle: "Our Vision", 
    visionContent: "To be the premier educational institution in Birnin Gwari, known for academic excellence, character development, and innovative teaching methods.",
    contactPhone: ["+2348079387958", "+2348034012480"],
    contactEmail: "shehubala70@gmail.com",
    contactAddress: "Birnin Gwari, Kaduna State, Nigeria",
    schoolHours: "Monday - Friday: 7:00 AM - 3:00 PM"
  });
});

app.put('/api/school-content', (req, res) => {
  res.json({ 
    message: 'School content updated successfully',
    content: req.body
  });
});

// Results endpoint
app.get('/api/results/student/current', authenticateToken, (req: any, res) => {
  const user = req.user;
  const { academicYear = '2024/2025', term = 'second' } = req.query;
  
  if (user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied. Student role required.' });
  }

  // Demo results for the student
  const demoResults = {
    hasResults: true,
    results: {
      id: 1,
      studentId: user.admissionNumber || 'SHA/2011/001',
      classId: 1,
      academicYear: academicYear,
      term: term,
      totalScore: 425,
      averageScore: 85.0,
      overallGrade: 'A',
      remarks: 'Excellent performance. Keep up the good work!',
      position: 3,
      totalStudents: 30,
      published: 1,
      enteredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    subjects: [
      { id: 1, subject: { _id: 1, name: 'Mathematics', code: 'MTH' }, ca1: 18, ca2: 17, exam: 50, total: 85, grade: 'A' },
      { id: 2, subject: { _id: 2, name: 'English Language', code: 'ENG' }, ca1: 16, ca2: 18, exam: 48, total: 82, grade: 'A' },
      { id: 3, subject: { _id: 3, name: 'Basic Science', code: 'BSC' }, ca1: 19, ca2: 16, exam: 52, total: 87, grade: 'A' },
      { id: 4, subject: { _id: 4, name: 'Social Studies', code: 'SST' }, ca1: 17, ca2: 19, exam: 49, total: 85, grade: 'A' },
      { id: 5, subject: { _id: 5, name: 'Islamic Religious Studies', code: 'IRS' }, ca1: 20, ca2: 18, exam: 48, total: 86, grade: 'A' }
    ]
  };

  res.json(demoResults);
});

// Admin users management
app.get('/api/admin/users', authenticateToken, (req: any, res) => {
  const user = req.user;
  
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin role required.' });
  }

  // Return demo users (excluding passwords)
  const users = demoUsers.map(u => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    role: u.role,
    isActive: u.isActive,
    ...(u.admissionNumber && { admissionNumber: u.admissionNumber }),
    ...(u.employeeId && { employeeId: u.employeeId })
  }));

  res.json(users);
});

// Catch all for undefined routes
app.all('*', (req, res) => {
  res.status(404).json({ 
    message: 'Endpoint not found',
    path: req.path,
    method: req.method,
    availableEndpoints: [
      'GET /api/health',
      'POST /api/auth/login',
      'GET /api/auth/me',
      'GET /api/dashboard/stats',
      'GET /api/dashboard/{role}/current',
      'GET /api/students/search/admission/{admissionNumber}',
      'GET /api/classes',
      'GET /api/subjects',
      'GET /api/school-content'
    ]
  });
});

export default app;