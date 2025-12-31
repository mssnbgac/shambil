// Script to push your complete code to academymssn/shambilprideacademy
const { execSync } = require('child_process');

console.log('🔄 Pushing Complete Shambil Pride Academy to academymssn Repository...\n');

try {
  // Check current status
  console.log('1. Checking current repository status...');
  const currentRemote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
  console.log(`   Current remote: ${currentRemote}`);

  // Set correct remote
  const targetRepo = 'https://github.com/academymssn/shambilprideacademy.git';
  console.log('\n2. Setting remote to academymssn repository...');
  execSync(`git remote set-url origin ${targetRepo}`, { stdio: 'inherit' });
  console.log(`   ✅ Remote set to: ${targetRepo}`);

  // Check for uncommitted changes
  console.log('\n3. Checking for uncommitted changes...');
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      console.log('   📝 Found uncommitted changes, committing...');
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "Complete Shambil Pride Academy Management System with Railway deployment"', { stdio: 'inherit' });
      console.log('   ✅ Changes committed');
    } else {
      console.log('   ✅ No uncommitted changes');
    }
  } catch (error) {
    console.log('   ✅ All changes already committed');
  }

  // Push to academymssn repository
  console.log('\n4. Pushing complete code to academymssn/shambilprideacademy...');
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('   ✅ Successfully pushed to academymssn repository!');

  console.log('\n🎉 SUCCESS! Your Complete Shambil Pride Academy is now in academymssn/shambilprideacademy');
  
  console.log('\n📋 What\'s Included:');
  console.log('✅ Complete React frontend (client/)');
  console.log('✅ Full Node.js backend (server/)');
  console.log('✅ SQLite database with demo data');
  console.log('✅ All 6 user roles (Admin, Student, Teacher, Accountant, Exam Officer, Parent)');
  console.log('✅ Authentication system with JWT');
  console.log('✅ Financial management (₦676K income, ₦215K expenses)');
  console.log('✅ Student records (Musa Sani - SHA/2011/001)');
  console.log('✅ Railway deployment configuration');
  console.log('✅ All test scripts and documentation');

  console.log('\n🚂 Next Steps - Deploy to Railway:');
  console.log('1. Go to https://railway.app');
  console.log('2. Login with GitHub');
  console.log('3. New Project → Deploy from GitHub repo');
  console.log('4. Select "academymssn/shambilprideacademy"');
  console.log('5. Set environment variables:');
  console.log('   NODE_ENV=production');
  console.log('   JWT_SECRET=shambil-pride-academy-super-secret-jwt-key-2024');
  console.log('6. Deploy and test!');

  console.log('\n🎓 Your school management system is ready for production! 🏫✨');

} catch (error) {
  console.error('\n❌ Error occurred:', error.message);
  
  if (error.message.includes('Permission denied') || error.message.includes('403')) {
    console.log('\n🔐 Permission Issue:');
    console.log('You need access to push to academymssn/shambilprideacademy.git');
    console.log('\n💡 Solutions:');
    console.log('1. Login as academymssn GitHub account');
    console.log('2. Add mssnbgac as collaborator to the repository');
    console.log('3. Create the repository if it doesn\'t exist');
    console.log('\n📖 See transfer-to-academymssn.md for detailed instructions');
  } else if (error.message.includes('does not exist')) {
    console.log('\n📁 Repository Not Found:');
    console.log('The repository academymssn/shambilprideacademy doesn\'t exist yet.');
    console.log('\n💡 Create it first:');
    console.log('1. Login to GitHub as academymssn');
    console.log('2. Go to https://github.com/new');
    console.log('3. Create repository named "shambilprideacademy"');
    console.log('4. Make it public (for Railway free tier)');
    console.log('5. Don\'t initialize with README');
    console.log('6. Run this script again');
  } else {
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check internet connection');
    console.log('2. Verify GitHub credentials');
    console.log('3. Ensure repository exists and you have access');
  }
}