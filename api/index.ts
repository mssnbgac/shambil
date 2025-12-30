// Vercel serverless function entry point
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Demo users for authentication
const demoUsers = [
  { id: 1, email: 'admin@shambil.edu.ng', password: 'admin123', role: 'admin', firstName: 'Admin', lastName: 'User' },
  { id: 2, email: 'Abbas@gmail.com', password: 'student123', role: 'student', firstName: 'Abbas', lastName: 'Student', admissionNumber: 'SHA/1996/003' },
  { id: 3, email: 'teacher@shambil.edu.ng', password: 'teacher123', role: 'teacher', firstName: 'Teacher', lastName: 'User' },
  { id: 4, email: 'accountant@shambil.edu.ng', password: 'accountant123', role: 'accountant', firstName: 'Accountant', lastName: 'User' },
  { id: 5, email: 'exam@shambil.edu.ng', password: 'exam123', role: 'exam_officer', firstName: 'Exam', lastName: 'Officer' },
  { id: 6, email: 'parent@shambil.edu.ng', password: 'parent123', role: 'parent', firstName: 'Parent', lastName: 'User' }
];

// Demo results data
const demoResults = {
  'SHA/1996/003': {
    '2024-2025': {
      'First Term': {
        subjects: [
          { subject: { _id: 1, name: 'Mathematics', code: 'MTH' }, ca1: 18, ca2: 17, exam: 45, total: 80, grade: 'A' },
          { subject: { _id: 2, name: 'English Language', code: 'ENG' }, ca1: 16, ca2: 18, exam: 41, total: 75, grade: 'B' },
          { subject: { _id: 3, name: 'Basic Science', code: 'BSC' }, ca1: 19, ca2: 16, exam: 43, total: 78, grade: 'B' },
          { subject: { _id: 4, name: 'Social Studies', code: 'SST' }, ca1: 17, ca2: 19, exam: 46, total: 82, grade: 'A' },
          { subject: { _id: 5, name: 'Islamic Religious Studies', code: 'IRS' }, ca1: 20, ca2: 18, exam: 47, total: 85, grade: 'A' }
        ],
        totalScore: 400,
        averageScore: 80,
        overallGrade: 'A',
        position: 3,
        totalStudents: 25,
        remarks: 'Excellent performance. Keep it up!'
      }
    }
  }
};

// Helper function to decode token
const decodeToken = (token) => {
  try {
    return JSON.parse(Buffer.from(token, 'base64').toString());
  } catch {
    return null;
  }
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Shambil Pride Academy API is running',
    timestamp: new Date().toISOString()
  });
});

// School content
app.get('/api/school-content', (req, res) => {
  res.json({
    heroTitle: "Welcome to Shambil Pride Academy Birnin Gwari",
    heroSubtitle: "Excellence in Education, Character Building, and Academic Achievement",
    aboutTitle: "About Our School",
    aboutContent: "Shambil Pride Academy Birnin Gwari is a leading educational institution committed to providing quality education and nurturing young minds.",
    missionTitle: "Our Mission",
    missionContent: "To provide comprehensive education that develops intellectual, social, and moral capabilities of our students.",
    visionTitle: "Our Vision", 
    visionContent: "To be the premier educational institution in Birnin Gwari, known for academic excellence and character development.",
    contactPhone: ["+2348079387958", "+2348034012480"],
    contactEmail: "shehubala70@gmail.com",
    contactAddress: "Birnin Gwari, Kaduna State, Nigeria",
    schoolHours: "Monday - Friday: 7:00 AM - 3:00 PM"
  });
});

app.put('/api/school-content', (req, res) => {
  res.json({ message: 'School content updated successfully' });
});

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = demoUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    const token = Buffer.from(JSON.stringify({ 
      userId: user.id,
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
});

// Dashboard endpoints
app.get('/api/dashboard/admin/current', (req, res) => {
  const admin = demoUsers.find(u => u.role === 'admin');
  res.json({
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    role: 'admin'
  });
});

app.get('/api/dashboard/student/current', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  const student = demoUsers.find(u => u.email === decoded.email && u.role === 'student');
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json({
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    role: student.role,
    admissionNumber: student.admissionNumber || 'SHA/1996/003',
    className: 'JSS 1A',
    house: 'RED'
  });
});

app.get('/api/dashboard/teacher/current', (req, res) => {
  const teacher = demoUsers.find(u => u.role === 'teacher');
  res.json({
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    email: teacher.email,
    role: 'teacher'
  });
});

app.get('/api/dashboard/accountant/current', (req, res) => {
  const accountant = demoUsers.find(u => u.role === 'accountant');
  res.json({
    firstName: accountant.firstName,
    lastName: accountant.lastName,
    email: accountant.email,
    role: 'accountant'
  });
});

app.get('/api/dashboard/exam-officer/current', (req, res) => {
  const examOfficer = demoUsers.find(u => u.role === 'exam_officer');
  res.json({
    firstName: examOfficer.firstName,
    lastName: examOfficer.lastName,
    email: examOfficer.email,
    role: 'exam_officer'
  });
});

app.get('/api/dashboard/parent/current', (req, res) => {
  const parent = demoUsers.find(u => u.role === 'parent');
  res.json({
    firstName: parent.firstName,
    lastName: parent.lastName,
    email: parent.email,
    role: 'parent'
  });
});

// Stats endpoints
app.get('/api/dashboard/admin/stats', (req, res) => {
  res.json({
    totalStudents: 150,
    totalTeachers: 25,
    totalClasses: 12,
    totalSubjects: 15,
    recentActivities: [
      { type: 'student_registered', message: 'New student Abbas registered', timestamp: new Date().toISOString() },
      { type: 'result_published', message: 'Results published for JSS 1A', timestamp: new Date().toISOString() }
    ]
  });
});

app.get('/api/dashboard/accountant/stats', (req, res) => {
  res.json({
    totalIncome: 676000,
    confirmedPayments: 676000,
    totalExpenditure: 215000,
    netBalance: 461000,
    financial: {
      totalIncome: 676000,
      totalExpenditure: 215000,
      netBalance: 461000
    },
    payments: {
      confirmedPayments: 676000,
      pendingPayments: 0
    }
  });
});

// Results endpoint
app.get('/api/results/student/current', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const { academicYear = '2024-2025', term = 'First Term' } = req.query;
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  const student = demoUsers.find(u => u.email === decoded.email && u.role === 'student');
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const admissionNumber = student.admissionNumber || 'SHA/1996/003';
  const studentResults = demoResults[admissionNumber];
  
  if (!studentResults || !studentResults[academicYear] || !studentResults[academicYear][term]) {
    return res.json({ 
      hasResults: false, 
      results: null, 
      subjects: [],
      message: `No results available for ${academicYear} - ${term}`,
      studentInfo: {
        name: `${student.firstName} ${student.lastName}`,
        admissionNumber: admissionNumber
      }
    });
  }

  const termResults = studentResults[academicYear][term];

  res.json({
    hasResults: true,
    results: {
      id: 1,
      studentId: admissionNumber,
      classId: 1,
      academicYear: academicYear,
      term: term,
      totalScore: termResults.totalScore,
      averageScore: termResults.averageScore,
      overallGrade: termResults.overallGrade,
      remarks: termResults.remarks,
      position: termResults.position,
      totalStudents: termResults.totalStudents,
      published: 1,
      enteredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    subjects: termResults.subjects
  });
});

// Classes and subjects
app.get('/api/classes', (req, res) => {
  res.json([
    { id: 1, name: 'JSS 1A', level: 'JSS 1' },
    { id: 2, name: 'JSS 1B', level: 'JSS 1' },
    { id: 3, name: 'JSS 2A', level: 'JSS 2' },
    { id: 4, name: 'JSS 3A', level: 'JSS 3' }
  ]);
});

app.get('/api/subjects', (req, res) => {
  res.json([
    { id: 1, name: 'Mathematics', code: 'MTH' },
    { id: 2, name: 'English Language', code: 'ENG' },
    { id: 3, name: 'Basic Science', code: 'BSC' },
    { id: 4, name: 'Social Studies', code: 'SST' },
    { id: 5, name: 'Islamic Religious Studies', code: 'IRS' }
  ]);
});

// Student search
app.get('/api/students/search/admission/:admissionNumber', (req, res) => {
  const { admissionNumber } = req.params;
  
  if (admissionNumber === 'SHA/1996/003') {
    res.json({
      _id: 1,
      admissionNumber: 'SHA/1996/003',
      studentId: 'SHA/1996/003',
      house: 'RED',
      user: {
        firstName: 'Abbas',
        lastName: 'Student',
        email: 'Abbas@gmail.com',
        phone: '+2348123456789'
      },
      class: {
        _id: 1,
        name: 'JSS 1A',
        level: 'JSS 1'
      }
    });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Messaging endpoints
app.get('/api/teacher/messages', (req, res) => {
  res.json([
    {
      id: 1,
      message: 'Need help with class schedule',
      recipient: 'admin',
      priority: 'normal',
      status: 'read',
      createdAt: new Date().toISOString(),
      reply: 'Schedule has been updated. Please check your dashboard.'
    }
  ]);
});

app.post('/api/teacher/messages', (req, res) => {
  const { message, recipient, priority } = req.body;
  res.json({
    success: true,
    message: 'Message sent successfully',
    data: {
      id: Date.now(),
      message,
      recipient,
      priority,
      status: 'unread',
      createdAt: new Date().toISOString()
    }
  });
});

app.get('/api/exam-officer/messages', (req, res) => {
  res.json([
    {
      id: 1,
      message: 'Question about exam schedule',
      sender: 'teacher',
      priority: 'normal',
      status: 'unread',
      createdAt: new Date().toISOString()
    }
  ]);
});

app.post('/api/exam-officer/messages', (req, res) => {
  res.json({ success: true, message: 'Message sent successfully' });
});

app.patch('/api/exam-officer/messages/:id/reply', (req, res) => {
  const { reply } = req.body;
  res.json({
    success: true,
    message: 'Reply sent successfully',
    data: { reply, repliedAt: new Date().toISOString() }
  });
});

// Catch all
app.all('*', (req, res) => {
  res.status(404).json({ 
    message: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

export default app;