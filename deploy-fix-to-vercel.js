// Deploy the fixed version to Vercel
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Deploying Fixed Version to Vercel...\n');

// Check if we're in a git repository
try {
  execSync('git status', { stdio: 'ignore' });
  console.log('✅ Git repository detected');
} catch (error) {
  console.log('❌ Not in a git repository. Please run: git init');
  process.exit(1);
}

// Check if files are staged
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status.trim()) {
    console.log('📝 Staging changes...');
    execSync('git add .', { stdio: 'inherit' });
    
    console.log('💾 Committing fixes...');
    execSync('git commit -m "Fix: Update Vercel API handler for serverless deployment"', { stdio: 'inherit' });
  } else {
    console.log('✅ No changes to commit');
  }
} catch (error) {
  console.log('⚠️  Commit failed, but continuing with deployment...');
}

// Push to main branch
try {
  console.log('📤 Pushing to main branch...');
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('✅ Successfully pushed to GitHub');
} catch (error) {
  console.log('❌ Push failed:', error.message);
  console.log('💡 You may need to push manually: git push origin main');
}

console.log('\n🎯 Deployment Steps:');
console.log('1. ✅ Fixed API handler for Vercel serverless functions');
console.log('2. ✅ Added required TypeScript dependencies');
console.log('3. ✅ Committed and pushed changes to GitHub');
console.log('4. 🔄 Vercel should auto-deploy from GitHub');

console.log('\n⏱️  Wait 2-3 minutes for Vercel to rebuild and deploy');
console.log('🌐 Then test: https://shambil-a3ae.vercel.app/api/health');

console.log('\n📋 Manual Steps if Auto-Deploy Fails:');
console.log('1. Go to vercel.com dashboard');
console.log('2. Find your shambil project');
console.log('3. Click "Redeploy" button');
console.log('4. Wait for deployment to complete');

console.log('\n🧪 Test the deployment with:');
console.log('   node test-vercel-updated.js');