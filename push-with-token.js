// Script to help push to academymssn repository with proper authentication
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Push to academymssn/shambilprideacademy with Authentication\n');

console.log('📋 You need a GitHub Personal Access Token to push to academymssn repository.');
console.log('');
console.log('🔑 To create a token:');
console.log('1. Go to GitHub → Settings → Developer settings → Personal access tokens');
console.log('2. Click "Generate new token (classic)"');
console.log('3. Select "repo" scope (full control of repositories)');
console.log('4. Generate and copy the token');
console.log('');

rl.question('🔐 Enter your GitHub Personal Access Token (or press Enter to skip): ', (token) => {
  if (!token.trim()) {
    console.log('\n💡 Alternative: You can also push manually:');
    console.log('git remote set-url origin https://academymssn:YOUR_TOKEN@github.com/academymssn/shambilprideacademy.git');
    console.log('git push origin main');
    console.log('\n📖 See setup-git-for-academymssn.md for detailed instructions');
    rl.close();
    return;
  }

  try {
    console.log('\n🔄 Setting up remote with authentication...');
    const remoteUrl = `https://academymssn:${token}@github.com/academymssn/shambilprideacademy.git`;
    execSync(`git remote set-url origin ${remoteUrl}`, { stdio: 'inherit' });
    
    console.log('📤 Pushing your complete Shambil Pride Academy system...');
    execSync('git push origin main', { stdio: 'inherit' });
    
    console.log('\n🎉 SUCCESS! Your code is now in academymssn/shambilprideacademy!');
    
    console.log('\n📋 What was pushed:');
    console.log('✅ Complete React frontend (client/)');
    console.log('✅ Full Node.js backend (server/)');
    console.log('✅ SQLite database with demo data');
    console.log('✅ All 6 user roles and authentication');
    console.log('✅ Railway deployment configuration');
    console.log('✅ All documentation and test scripts');
    
    console.log('\n🚂 Next: Deploy to Railway');
    console.log('1. Go to https://railway.app');
    console.log('2. Login with GitHub (as academymssn)');
    console.log('3. New Project → Deploy from GitHub repo');
    console.log('4. Select "academymssn/shambilprideacademy"');
    console.log('5. Set environment variables and deploy!');
    
    console.log('\n🎓 Your school management system will be live in 5 minutes! 🏫✨');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.message.includes('Permission denied') || error.message.includes('403')) {
      console.log('\n🔐 Authentication failed. Please check:');
      console.log('1. Token is correct and has "repo" scope');
      console.log('2. You\'re logged into GitHub as academymssn');
      console.log('3. Repository exists and you have access');
    } else if (error.message.includes('not found')) {
      console.log('\n📁 Repository not found. Please:');
      console.log('1. Create repository at https://github.com/new');
      console.log('2. Name it "shambilprideacademy"');
      console.log('3. Make it public (for Railway free tier)');
      console.log('4. Don\'t initialize with README');
    }
    
    console.log('\n📖 See setup-git-for-academymssn.md for detailed troubleshooting');
  }
  
  rl.close();
});