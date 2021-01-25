const githubLabelSync = require('github-label-sync');
const fs = require('fs');
const filendir = require('filendir');
const commandLineArgs = require('command-line-args');

// Define possible command line options.
const cmdLineOptions = [
  {
    name: 'dry-run',
    type: Boolean
  },
  {
    name: 'preserve-labels',
    type: Boolean
  },
  {
    name: 'repo',
    type: String,
    multiple: true
  }
];

// Load config, repositories list and common labels.
const cmdOptions = commandLineArgs( cmdLineOptions );
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const repositories = cmdOptions.repo || JSON.parse(fs.readFileSync('./repositories.json', 'utf8'));
const commonLabels = JSON.parse(fs.readFileSync('./labels/commons.json', 'utf8'));

// Set command line args.
let dryRun = cmdOptions['dry-run'] || false;
let preserveLabels = cmdOptions['preserve-labels'] || false;

// Start dialog.
console.log('\nStarting sync...');
if (dryRun) {
  console.log('✔️ "--dry-run" is enabled. No changes will happen in any repository.');
}
if (preserveLabels) {
  console.log('✔️ "--preserve-labels" is enabled. New labels introduced directly in GitHub will be preserved.');
}

console.log( '\nRepositories:' );
// Run labels sync for each repository.
repositories.forEach(function(repo) {
  console.log( '  -' + repo );
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
