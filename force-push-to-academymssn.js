// Force push to academymssn repository
const { execSync } = require('child_process');

console.log('🚀 Pushing Complete Shambil Pride Academy to academymssn Repository...\n');

try {
  // First, let's commit any uncommitted changes
  console.log('1. Committing all changes...');
  execSync('git add .', { stdio: 'inherit' });
  
  try {
    execSync('git commit -m "Complete Shambil Pride Academy Management System - Ready for Railway deployment"', { stdio: 'inherit' });
    console.log('   ✅ Changes committed');
  } catch (error) {
    console.log('   ✅ No new changes to commit');
  }

  // Set the remote to academymssn repository
  console.log('\n2. Setting remote to academymssn repository...');
  execSync('git remote set-url origin https://github.com/academymssn/shambilprideacademy.git', { stdio: 'inherit' });
  console.log('   ✅ Remote set to academymssn/shambilprideacademy');

  // Try to push (this will prompt for credentials if needed)
  console.log('\n3. Pushing to academymssn/shambilprideacademy...');
  console.log('   (If prompted, use your GitHub username and password/token)');
  
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('\n🎉 SUCCESS! Your Complete Shambil Pride Academy is now in academymssn/shambilprideacademy!');
  
  console.log('\n📋 What was pushed:');
  console.log('✅ Complete React frontend (client/ folder)');
  console.log('✅ Full Node.js backend (server/ folder)');
  console.log('✅ SQLite database with demo data');
  console.log('✅ All 6 user roles: Admin, Student, Teacher, Accountant, Exam Officer, Parent');
  console.log('✅ Authentication system with JWT');
  console.log('✅ Financial management (₦676K income, ₦215K expenses)');
  console.log('✅ Student records (Musa Sani - SHA/2011/001)');
  console.log('✅ Railway deployment configuration (railway.json)');
  console.log('✅ All test scripts and documentation');
  console.log('✅ Package.json with all dependencies');

  console.log('\n🚂 NEXT STEP: Deploy to Railway');
  console.log('1. Go to https://railway.app');
  console.log('2. Login with GitHub (as academymssn)');
  console.log('3. Click "New Project"');
  console.log('4. Select "Deploy from GitHub repo"');
  console.log('5. Choose "academymssn/shambilprideacademy"');
  console.log('6. Set environment variables:');
  console.log('   NODE_ENV=production');
  console.log('   JWT_SECRET=shambil-pride-academy-super-secret-jwt-key-2024');
  console.log('7. Deploy and get your live URL!');

  console.log('\n🎓 Your school management system will be live in 5 minutes! 🏫✨');
  console.log('\n🌐 Repository: https://github.com/academymssn/shambilprideacademy');

} catch (error) {
  console.error('\n❌ Error occurred:', error.message);
  
  if (error.message.includes('Permission denied') || error.message.includes('403')) {
    console.log('\n🔐 Authentication Issue:');
    console.log('You need to authenticate with GitHub as academymssn.');
    console.log('\n💡 Quick Solutions:');
    console.log('1. Create Personal Access Token:');
    console.log('   - Go to GitHub → Settings → Developer settings → Personal access tokens');
    console.log('   - Generate new token with "repo" scope');
    console.log('   - Use token as password when prompted');
    console.log('\n2. Or use token in URL:');
    console.log('   git remote set-url origin https://academymssn:YOUR_TOKEN@github.com/academymssn/shambilprideacademy.git');
    console.log('   git push origin main');
    console.log('\n3. Or use GitHub CLI:');
    console.log('   gh auth login');
    console.log('   git push origin main');
  } else if (error.message.includes('not found') || error.message.includes('does not exist')) {
    console.log('\n📁 Repository Issue:');
    console.log('The repository might not exist or you might not have access.');
    console.log('\n💡 Solutions:');
    console.log('1. Make sure you\'re logged into GitHub as academymssn');
    console.log('2. Create the repository if it doesn\'t exist:');
    console.log('   - Go to https://github.com/new');
    console.log('   - Repository name: shambilprideacademy');
    console.log('   - Make it public (for Railway free tier)');
    console.log('   - Don\'t initialize with README');
    console.log('3. Then run this script again');
  }
  
  console.log('\n📖 For detailed help, see setup-git-for-academymssn.md');
}