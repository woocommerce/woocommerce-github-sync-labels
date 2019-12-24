const githubLabelSync = require('github-label-sync');
const fs = require('fs');
const hasFlag = require('has-flag');
const filendir = require('filendir')

// Load config, repositories list and common labels.
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const repositories = JSON.parse(fs.readFileSync('./repositories.json', 'utf8'));
const commonLabels = JSON.parse(fs.readFileSync('./labels/commons.json', 'utf8'));

// Set command line args.
let dryRun = hasFlag('--dry-run');
let preserveLabels = hasFlag('--preserve-labels');

// Start dialog.
console.log('Starting sync...');
if (dryRun) {
  console.log('✔️ "--dry-run" is enabled. No changes will happens in any repository.');
}
if (preserveLabels) {
  console.log('✔️ "--preserve-labels" is enabled. New labels introduced directly in GitHub will be preserved.');
}

// Run labels sync for each repository.
repositories.forEach(function(repo) {
  const projectLabels = './labels/' + repo + '.json';
  let labels = commonLabels;

  if (fs.existsSync(projectLabels)) {
    labels = JSON.parse(fs.readFileSync(projectLabels, 'utf8'));
  }

  githubLabelSync({
    accessToken: config.githubAccessToken,
    repo: repo,
    labels: labels,
    dryRun: dryRun,
    allowAddedLabels: preserveLabels
  }).then((diff) => {
    filendir.writeFileSync('./logs/' + repo + '.txt', JSON.stringify(diff, null, 2));
    console.log('Labels synced for "' + repo + '"');
  });
});
