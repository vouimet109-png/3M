const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const versionsDir = path.join(baseDir, 'vertions');
const versionsJson = path.join(baseDir, 'vertions.json');

const allowedExt = ['.exe', '.msi', '.apk', '.dmg', '.app', '.zip', '.cab', '.tar', '.gz', '.7z'];

function isDownloadExtension(filename) {
  return allowedExt.includes(path.extname(filename).toLowerCase());
}

function getVersionsFromFolder() {
  const entries = [];

  if (!fs.existsSync(versionsDir)) {
    console.warn(`Dossier de versions introuvable : ${versionsDir}`);
    return entries;
  }

  const folders = fs.readdirSync(versionsDir, { withFileTypes: true });

  folders
    .filter(dirent => dirent.isDirectory())
    .forEach(dirent => {
      const folderName = dirent.name;
      const folderPath = path.join(versionsDir, folderName);
      const files = fs.readdirSync(folderPath, { withFileTypes: true });

      files
        .filter(fileDirent => fileDirent.isFile() && isDownloadExtension(fileDirent.name))
        .forEach(fileDirent => {
          const fileName = fileDirent.name;
          const filePath = path.join(folderPath, fileName);
          const stat = fs.statSync(filePath);
          const sizeMB = Number((stat.size / 1024 / 1024).toFixed(2));

          entries.push({
            path: `vertions/${folderName}/${fileName}`,
            name: folderName,
            file: fileName,
            size: sizeMB
          });
        });
    });

  return entries;
}

function writeVersionsJson(versions) {
  const content = {
    lastUpdate: new Date().toISOString().replace('T', ' ').replace('Z', ''),
    versions
  };

  fs.writeFileSync(versionsJson, JSON.stringify(content, null, 4), { encoding: 'utf8' });
  console.log(`✅ vertions.json mis à jour (${versions.length} version(s))`);
}

function scanAndUpdate() {
  const versions = getVersionsFromFolder();
  writeVersionsJson(versions);
}

function watchFolder() {
  if (!fs.existsSync(versionsDir)) {
    console.warn('Le dossier site/vertions n\'existe pas. Création automatique');
    fs.mkdirSync(versionsDir, { recursive: true });
  }

  scanAndUpdate();

  fs.watch(versionsDir, { recursive: true }, (eventType, filename) => {
    console.log(`🔄 Changement détecté: ${eventType} ${filename}`);
    // Délais pour éviter les modifications multiples
    setTimeout(scanAndUpdate, 500);
  });

  console.log('👀 Surveillance du dossier site/vertions démarrée (Ctrl+C pour quitter)...');
}

if (require.main === module) {
  watchFolder();
}

module.exports = {
  scanAndUpdate,
  getVersionsFromFolder
};
