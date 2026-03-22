const { app, BrowserWindow, ipcMain, dialog, Menu, shell } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;
let colorWindow;
let themeWindow;
let currentBackgroundColor = "#0f2027";
let currentBackgroundImage = null;
let currentLanguage = "en";
let languages = {};

// Load languages from file
try {
  const langFile = path.join(__dirname, "language.json");
  languages = JSON.parse(fs.readFileSync(langFile, "utf8"));
} catch (e) {
  console.error("Error loading languages:", e);
}

// Broadcast language change to all windows
function safeSend(win, channel, ...args) {
  if (win && !win.isDestroyed() && win.webContents) {
    try {
      win.webContents.send(channel, ...args);
    } catch (err) {
      console.warn(`[main] Safe send failed for ${channel}:`, err);
    }
  }
}

function broadcastLanguageChange(lang) {
  currentLanguage = lang;
  
  // Save language to config
  const config = loadConfig();
  config.option.language = lang;
  saveConfig(config);
  
  safeSend(mainWindow, "change-language", lang);
  safeSend(themeWindow, "change-language", lang);
  safeSend(colorWindow, "change-language", lang);
  
  // Recreate menu with new language
  createMenu();
}

// Config file path in AppData
const configDir = path.join(app.getPath("appData"), "3M");
const configFile = path.join(configDir, "config.json");

// Load config from AppData
function loadConfig() {
  try {
    if (fs.existsSync(configFile)) {
      const data = fs.readFileSync(configFile, "utf8");
      let config = JSON.parse(data);

      // Migrate old config structure to new one
      config = migrateConfigToNewStructure(config);

      return config;
    }
  } catch (e) {
    console.error("Erreur lecture config:", e);
  }
  return getDefaultConfig();
}

// Migrate old config structure to new one
function migrateConfigToNewStructure(oldConfig) {
  // If already new structure, return as is
  if (oldConfig.txtFileGenerator) {
    return oldConfig;
  }

  // Convert old structure to new structure
  const newConfig = getDefaultConfig();

  // Migrate txtFileGenerator settings
  if (oldConfig.maxNumber !== undefined) newConfig.txtFileGenerator.maxNumber = oldConfig.maxNumber;
  if (oldConfig.fileName !== undefined) newConfig.txtFileGenerator.fileName = oldConfig.fileName;
  if (oldConfig.folder !== undefined) newConfig.txtFileGenerator.folder = oldConfig.folder;

  // Migrate options
  if (oldConfig.language !== undefined) newConfig.option.language = oldConfig.language;

  // Migrate background
  if (oldConfig.background && oldConfig.background.type) {
    newConfig.background.type = oldConfig.background.type;
  } else if (oldConfig.backgroundImage) {
    newConfig.background.type = "picture";
  } else if (oldConfig.theme) {
    newConfig.background.type = "theme";
  } else if (oldConfig.backgroundColor) {
    newConfig.background.type = "color";
  }

  // Migrate theme settings
  if (oldConfig.theme) {
    if (oldConfig.theme.name) newConfig.theme.type = oldConfig.theme.name;

    // Matrix settings
    if (oldConfig.theme.speed !== undefined) newConfig.theme.matrixSpeed = oldConfig.theme.speed;
    if (oldConfig.theme.direction === "vertical") newConfig.theme.matrixOrientation = 1;
    else if (oldConfig.theme.direction === "horizontal") newConfig.theme.matrixOrientation = 2;
    if (oldConfig.theme.scrollDir === "down") newConfig.theme.matrixScrollDirection = 1;
    else if (oldConfig.theme.scrollDir === "up") newConfig.theme.matrixScrollDirection = 2;
    else if (oldConfig.theme.scrollDir === "right") newConfig.theme.matrixScrollDirection = 3;
    else if (oldConfig.theme.scrollDir === "left") newConfig.theme.matrixScrollDirection = 4;
    if (oldConfig.theme.fontSize !== undefined) newConfig.theme.matrixNumbersSize = oldConfig.theme.fontSize;

    // Galactic settings (set defaults if not present)
    newConfig.theme.galacticSpeed = oldConfig.theme.galacticSpeed || 1;
    newConfig.theme.galacticStarsCount = oldConfig.theme.galacticStarsCount || 150;
    newConfig.theme.galacticStarsSize = oldConfig.theme.galacticStarsSize || 2;

    // Ocean settings (set defaults if not present)
    newConfig.theme.oceanBubblesSize = oldConfig.theme.oceanBubblesSize || 80;
    newConfig.theme.oceanBubblesSpeed = oldConfig.theme.oceanBubblesSpeed || 1;
    newConfig.theme.oceanBubblesDirection = oldConfig.theme.oceanBubblesDirection || 1;
  }

  // Migrate color and picture
  if (oldConfig.backgroundColor) newConfig.color.value = oldConfig.backgroundColor;
  if (oldConfig.backgroundImage) newConfig.picture.path = oldConfig.backgroundImage;

  return newConfig;
}

// Get default config structure
function getDefaultConfig() {
  return {
    "txtFileGenerator": {
      "maxNumber": "10000",
      "fileName": "numbers",
      "folder": null
    },
    "option": {
      "language": "en"
    },
    "background": {
      "type": "theme"
    },
    "theme": {
      "type": "matrix",
      "galacticSpeed": 1,
      "galacticStarsCount": 150,
      "galacticStarsSize": 2,
      "matrixSpeed": 1,
      "matrixOrientation": 1,
      "matrixScrollDirection": 1,
      "matrixNumbersSize": 16,
      "oceanBubblesSize": 80,
      "oceanBubblesSpeed": 1,
      "oceanBubblesDirection": 1
    },
    "color": {
      "value": "#00b3ff"
    },
    "picture": {
      "path": null
    },
    "game": {
      "chromeDinoHiScore": 0
    }
  };
}

// Save config to AppData
function saveConfig(config) {
  try {
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
  } catch (e) {
    console.error("Erreur sauvegarde config:", e);
  }
}

// Convert new theme structure to old format for renderer
function convertThemeToOldFormat(newTheme) {
  const oldTheme = { name: newTheme.type };

  switch (newTheme.type) {
    case "galactic":
      oldTheme.speed = newTheme.galacticSpeed;
      oldTheme.starCount = newTheme.galacticStarsCount;
      oldTheme.starSize = newTheme.galacticStarsSize;
      break;
    case "matrix":
      oldTheme.speed = newTheme.matrixSpeed;
      oldTheme.direction = newTheme.matrixOrientation === 1 ? "vertical" : "horizontal";
      oldTheme.scrollDir = ["down", "up", "right", "left"][newTheme.matrixScrollDirection - 1] || "down";
      oldTheme.fontSize = newTheme.matrixNumbersSize;
      break;
    case "ocean":
      oldTheme.bubbleSize = newTheme.oceanBubblesSize;
      oldTheme.bubbleSpeed = newTheme.oceanBubblesSpeed;
      oldTheme.bubbleDir = ["up", "down", "left", "right"][newTheme.oceanBubblesDirection - 1] || "up";
      break;
  }

  return oldTheme;
}

// Convert old theme format to new structure
function convertThemeToNewFormat(oldTheme) {
  const newTheme = {
    type: oldTheme.name,
    galacticSpeed: 1,
    galacticStarsCount: 150,
    galacticStarsSize: 2,
    matrixSpeed: 1,
    matrixOrientation: 1,
    matrixScrollDirection: 1,
    matrixNumbersSize: 16,
    oceanBubblesSize: 80,
    oceanBubblesSpeed: 1,
    oceanBubblesDirection: 1
  };

  switch (oldTheme.name) {
    case "galactic":
      if (oldTheme.speed !== undefined) newTheme.galacticSpeed = oldTheme.speed;
      if (oldTheme.starCount !== undefined) newTheme.galacticStarsCount = oldTheme.starCount;
      if (oldTheme.starSize !== undefined) newTheme.galacticStarsSize = oldTheme.starSize;
      break;
    case "matrix":
      if (oldTheme.speed !== undefined) newTheme.matrixSpeed = oldTheme.speed;
      if (oldTheme.direction === "vertical") newTheme.matrixOrientation = 1;
      else if (oldTheme.direction === "horizontal") newTheme.matrixOrientation = 2;
      if (oldTheme.scrollDir === "down") newTheme.matrixScrollDirection = 1;
      else if (oldTheme.scrollDir === "up") newTheme.matrixScrollDirection = 2;
      else if (oldTheme.scrollDir === "right") newTheme.matrixScrollDirection = 3;
      else if (oldTheme.scrollDir === "left") newTheme.matrixScrollDirection = 4;
      if (oldTheme.fontSize !== undefined) newTheme.matrixNumbersSize = oldTheme.fontSize;
      break;
    case "ocean":
      if (oldTheme.bubbleSize !== undefined) newTheme.oceanBubblesSize = oldTheme.bubbleSize;
      if (oldTheme.bubbleSpeed !== undefined) newTheme.oceanBubblesSpeed = oldTheme.bubbleSpeed;
      if (oldTheme.bubbleDir === "up") newTheme.oceanBubblesDirection = 1;
      else if (oldTheme.bubbleDir === "down") newTheme.oceanBubblesDirection = 2;
      else if (oldTheme.bubbleDir === "left") newTheme.oceanBubblesDirection = 3;
      else if (oldTheme.bubbleDir === "right") newTheme.oceanBubblesDirection = 4;
      break;
  }

  return newTheme;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    title: "3M - TXT Generator 1.0",
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.setTitle("3M - TXT Generator 1.0");
  mainWindow.loadFile("index.html");

  // Set title after page loaded (and avoid override from <title>)
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.setTitle("3M - TXT Generator 1.0");
  });

  // Charger les paramètres sauvegardés quand le DOM est prêt
  mainWindow.webContents.on("dom-ready", () => {
    // Petit délai pour s'assurer que renderer.js est chargé
    setTimeout(() => {
      const config = loadConfig();
      console.log("[main] Loading config at startup:", config);
      console.log("[main] Background type:", config.background?.type);
      
      // Load saved language
      if (config.option?.language) {
        currentLanguage = config.option.language;
        console.log("[main] Loading saved language:", currentLanguage);
      }
      
      // Send current language to renderer
      mainWindow.webContents.send("change-language", currentLanguage);

      // Priority order: Picture > Theme > Color
      if (config.picture?.path && config.background?.type === "picture") {
        console.log("[main] Loading saved picture:", config.picture.path);
        mainWindow.webContents.send("background-image", config.picture.path);
      } else if (config.theme && config.background?.type === "theme") {
        console.log("[main] Loading saved theme:", config.theme.type);
        // Convert new theme structure to old format for renderer
        const themeData = convertThemeToOldFormat(config.theme);
        mainWindow.webContents.send("apply-theme", themeData);
      } else if (config.color?.value && config.background?.type === "color") {
        console.log("[main] Loading saved color:", config.color.value);
        mainWindow.webContents.send("background-color", config.color.value);
      } else {
        console.log("[main] No background type set, loading default");
      }

      // Send game high scores to renderer
      if (config.game) {
        mainWindow.webContents.send("load-game-scores", config.game);
        console.log("[main] Loading game scores:", config.game);
      }
    }, 500); // 500ms delay
  });

  // open devtools for debugging
  // mainWindow.webContents.openDevTools({ mode: "detach" });
  createMenu();
}

// Load saved language on app startup
function loadSavedLanguage() {
  try {
    const config = loadConfig();
    if (config.option?.language) {
      currentLanguage = config.option.language;
      console.log("[main] Loaded saved language:", currentLanguage);
    }
  } catch (e) {
    console.error("Error loading saved language:", e);
  }
}

app.whenReady().then(() => {
  loadSavedLanguage();
  createWindow();
});

/* ---------------- MENU ---------------- */

function createMenu() {
  const lang = languages[currentLanguage] || languages.en;
  
  const template = [
    {
      label: lang.fileMenu || "File",
      submenu: [
        { label: lang.quit || "Quit", click: () => app.quit() }
      ]
    },
    {
      label: lang.editMenu || "Edit",
      submenu: [
        {
          label: lang.background || "Background",
          submenu: [
            { label: lang.color || "Color", click: () => openColorWindow() },
            { label: lang.picture || "Picture", click: () => openPicture() },
            { label: lang.theme || "Theme", click: () => openThemeWindow() }
          ]
        }
      ]
    },
    {
      label: lang.optionsMenu || "Options",
      submenu: [
        {
          label: lang.language || "Language",
          submenu: [
            { label: "Français", click: () => broadcastLanguageChange("fr") },
            { label: "English", click: () => broadcastLanguageChange("en") },
            { label: "Español", click: () => broadcastLanguageChange("es") },
            { label: "Deutsch", click: () => broadcastLanguageChange("de") },
            { label: "Italiano", click: () => broadcastLanguageChange("it") },
            { label: "Português", click: () => broadcastLanguageChange("pt") },
            { label: "Русский", click: () => broadcastLanguageChange("ru") },
            { label: "中文", click: () => broadcastLanguageChange("zh") },
            { label: "日本語", click: () => broadcastLanguageChange("ja") },
            { label: "العربية", click: () => broadcastLanguageChange("ar") }
          ]
        }
      ]
    },
    {
      label: lang.helpMenu || "Help",
      click: () => shell.openExternal("https://vouimet109-png.github.io/3M/")
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

/* ---------------- COLOR WINDOW ---------------- */

function openColorWindow() {
  colorWindow = new BrowserWindow({
    width: 300,
    height: 220,
    resizable: false,
    icon: path.join(__dirname, "icon.ico"),
    parent: mainWindow,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  colorWindow.loadFile("color.html");
  colorWindow.webContents.on("did-finish-load", () => {
    // Send current language
    colorWindow.webContents.send("change-language", currentLanguage);
    colorWindow.webContents.send("load-current-color", currentBackgroundColor);
  });
  colorWindow.setMenu(null);
}

ipcMain.on("apply-color", (event, color) => {
  console.log("[main] received apply-color", color);
  currentBackgroundColor = color;
  // save color to config
  const config = loadConfig();
  config.color.value = color;
  config.background.type = "color";
  saveConfig(config);
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send("background-color", color);
  }
  if (colorWindow) colorWindow.close();
});

/* ---------------- THEME WINDOW ---------------- */

function openThemeWindow() {
  themeWindow = new BrowserWindow({
    width: 500,
    height: 500,
    icon: path.join(__dirname, "icon.ico"),
    parent: mainWindow,
    modal: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  themeWindow.loadFile("theme.html");
  // send saved theme config when window loads
  themeWindow.webContents.on("did-finish-load", () => {
    const config = loadConfig();
    // Send current language
    themeWindow.webContents.send("change-language", currentLanguage);
    if (config.theme) {
      themeWindow.webContents.send("load-theme-config", config.theme);
    }
  });
}

ipcMain.on("apply-theme", (event, data) => {
  console.log("[main] apply-theme called", data);
  // Save theme to config
  const config = loadConfig();
  config.theme = convertThemeToNewFormat(data);
  config.background.type = "theme";
  saveConfig(config);

  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send("apply-theme", data);
  }
  if (themeWindow) {
    setTimeout(() => {
      if (themeWindow) themeWindow.close();
    }, 300);
  }
});

/* ---------------- PICTURE ---------------- */

async function openPicture() {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Images", extensions: ["png","jpg","jpeg"] }]
  });

  if (!result.canceled) {
    const imagePath = result.filePaths[0];
    // save image path to config
    const config = loadConfig();
    config.picture.path = imagePath;
    config.background.type = "picture";
    saveConfig(config);
    mainWindow.webContents.send("background-image", imagePath);
  }
}

function removePicture() {
  // remove image from config
  const config = loadConfig();
  config.picture.path = null;
  config.background.type = "theme"; // revert to theme
  saveConfig(config);
  // reset background and apply theme if available
  mainWindow.webContents.send("reset-background");
  if (config.theme) {
    const themeData = convertThemeToOldFormat(config.theme);
    mainWindow.webContents.send("apply-theme", themeData);
  }
}

/* ---------------- FOLDER ---------------- */

ipcMain.handle("select-folder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });

  if (result.canceled) return null;
  return result.filePaths[0];
});

ipcMain.handle("generate-file", async (event, { folderPath, fileName, maxNumber }) => {
  try {
    let content = "";
    for (let i = 1; i <= maxNumber; i++) {
      content += i + "\n";
    }

    const filePath = path.join(folderPath, fileName + ".txt");
    fs.writeFileSync(filePath, content);

    const fileSize = (content.length / 1024).toFixed(2);
    return { success: true, size: fileSize, path: filePath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.on("open-calculator", () => {
  let calcWindow = new BrowserWindow({
    width: 400,
    height: 600,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  calcWindow.loadFile("calculatrice.html");
  calcWindow.setMenu(null);
});

// Save Chrome Dino high score
ipcMain.on("save-dino-high-score", (event, score) => {
  const config = loadConfig();
  if (!config.game) {
    config.game = {};
  }
  const currentScore = config.game.chromeDinoHiScore || 0;
  if (score > currentScore) {
    config.game.chromeDinoHiScore = score;
    saveConfig(config);
    console.log("[main] Saved Chrome Dino high score:", score);
  }
});