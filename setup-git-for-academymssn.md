# 🔧 Setup Git for academymssn Account

## 🎯 **Current Issue**
- You're logged into GitHub as `academymssn` ✅
- But your local Git is still authenticated as `mssnbgac` ❌
- Need to authenticate Git with `academymssn` credentials

## 🚀 **Quick Solutions**

### **Option 1: Use Personal Access Token (Recommended)**

#### **Step 1: Create Personal Access Token**
1. **Go to** GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. **Click** "Generate new token (classic)"
3. **Set expiration** to 90 days or No expiration
4. **Select scopes**: Check `repo` (full control of private repositories)
5. **Generate token** and **copy it** (save it somewhere safe)

#### **Step 2: Push with Token**
```bash
# Use this format: https://username:token@github.com/repo.git
git remote set-url origin https://academymssn:YOUR_TOKEN_HERE@github.com/academymssn/shambilprideacademy.git
git push origin main
```

### **Option 2: Use GitHub CLI (Alternative)**
```bash
# Install GitHub CLI if not installed
# Then authenticate
gh auth login
# Select GitHub.com, HTTPS, Yes to authenticate Git, Login with web browser
# Then push normally
git push origin main
```

### **Option 3: Configure Git Credentials**
```bash
# Set Git to use academymssn credentials
git config user.name "academymssn"
git config user.email "your-academymssn-email@example.com"

# Clear any cached credentials
git config --global --unset credential.helper
# Or on Windows:
git config --global credential.helper manager-core

# Then try pushing (it will prompt for credentials)
git push origin main
```

## 🎯 **After Successful Push**

Once your code is in `academymssn/shambilprideacademy.git`, you can:

### **Deploy to Railway (5 minutes)**
1. **Go to** https://railway.app
2. **Login** with GitHub (as academymssn)
3. **New Project** → Deploy from GitHub repo
4. **Select** "academymssn/shambilprideacademy"
5. **Set environment variables**:
   ```
   NODE_ENV=production
   JWT_SECRET=shambil-pride-academy-super-secret-jwt-key-2024
   ```
6. **Deploy** and get your live URL!

## 💡 **Quick Test**
After pushing, verify your code is there:
1. Go to https://github.com/academymssn/shambilprideacademy
2. Check if you see all your files (client/, server/, package.json, etc.)
3. If yes, proceed to Railway deployment!

## 🎉 **What You'll Get**
- **Live URL**: Professional school management system
- **All 6 User Roles**: Admin, Student, Teacher, Accountant, Exam Officer, Parent
- **Complete Features**: Authentication, dashboards, financial management
- **Demo Data**: Musa Sani (SHA/2011/001), ₦676K income, etc.
- **Free Hosting**: 30 days free, then $0-1/month

Your Shambil Pride Academy system is ready to go live! 🏫✨