// Script to help push Railway configuration to the correct repository
const { execSync } = require('child_process');

console.log('🚂 Pushing Railway Configuration to Correct Repository...\n');

try {
  // Check current remote
  console.log('1. Checking current remote...');
  const currentRemote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
  console.log(`   Current remote: ${currentRemote}`);

  // Update remote if needed
  const targetRepo = 'https://github.com/academymssn/shambilprideacademy.git';
  if (currentRemote !== targetRepo) {
    console.log('\n2. Updating remote to correct repository...');
    execSync(`git remote set-url origin ${targetRepo}`, { stdio: 'inherit' });
    console.log(`   ✅ Remote updated to: ${targetRepo}`);
  } else {
    console.log('\n2. ✅ Remote already points to correct repository');
  }

  // Check if there are changes to commit
  console.log('\n3. Checking for changes...');
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      console.log('   📝 Found changes to commit');
      
      // Add all files
      console.log('\n4. Adding Railway configuration files...');
      execSync('git add .', { stdio: 'inherit' });
      
      // Commit changes
      console.log('\n5. Committing Railway configuration...');
      execSync('git commit -m "Add Railway deployment configuration and guides"', { stdio: 'inherit' });
      
      console.log('   ✅ Changes committed successfully');
    } else {
      console.log('   ✅ No changes to commit');
    }
  } catch (error) {
    console.log('   ⚠️  No changes to commit or already committed');
  }

  // Push to repository
  console.log('\n6. Pushing to GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('   ✅ Successfully pushed to GitHub!');

  console.log('\n🎉 Railway Configuration Successfully Pushed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Go to https://railway.app');
  console.log('2. Login with GitHub');
  console.log('3. Create new project');
  console.log('4. Select "academymssn/shambilprideacademy" repository');
  console.log('5. Deploy and set environment variables');
  console.log('\n📖 Full guide: Read DEPLOY_TO_RAILWAY_COMPLETE.md');

} catch (error) {
  console.error('\n❌ Error occurred:', error.message);
  
  if (error.message.includes('Permission denied') || error.message.includes('403')) {
    console.log('\n🔐 Permission Issue Detected:');
    console.log('1. Make sure you have push access to academymssn/shambilprideacademy');
    console.log('2. Check if you\'re logged into the correct GitHub account');
    console.log('3. You may need to authenticate with GitHub');
    console.log('\n💡 Alternative: Manually push the changes:');
    console.log('   git remote set-url origin https://github.com/academymssn/shambilprideacademy.git');
    console.log('   git add .');
    console.log('   git commit -m "Add Railway deployment configuration"');
    console.log('   git push origin main');
  } else {
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your internet connection');
    console.log('2. Verify GitHub repository exists');
    console.log('3. Ensure you have proper Git configuration');
  }
}