const { ipcRenderer } = require("electron");

console.log("[renderer] Renderer.js loaded");

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let animationId;
let languages = {};
let currentLanguage = "en";
let currentThemeBg = null;
let currentThemeData = null; // stores {name, ...params} for reapplying theme
let currentBackgroundImage = null; // track if image is active
let gameScores = {}; // stores game high scores

// Galactic theme variables
let galacticStars = [];
let galacticAnimationData = null;

/* -------- LOAD LANGUAGES -------- */

const languagesPromise = fetch("language.json")
  .then(res => res.json())
  .then(data => {
    languages = data;
    currentLanguage = "en";
    updateLanguage("en");
    // Show estimated size with correct translation after languages load
    const maxNumber = parseInt(document.getElementById("maxNumber").value) || 10000;
    const estimatedSize = calculateFileSize(maxNumber);
    const sizeLabel = languages[currentLanguage]?.estimatedSize || "Estimated size:";
    document.getElementById("fileSize").textContent = sizeLabel + " " + estimatedSize + " KB";
    return true;
  });

function updateLanguage(lang) {
  if (!languages[lang]) return;
  currentLanguage = lang;

  document.getElementById("title").textContent = languages[lang].title;
  document.getElementById("maxLabel").textContent = languages[lang].maxNumber;
  document.getElementById("fileLabel").textContent = languages[lang].fileName;
  document.getElementById("selectFolderBtn").textContent = languages[lang].selectFolder;
  document.getElementById("generateBtn").textContent = languages[lang].generate;
}

function sendDinoLanguageToIframe(lang = currentLanguage) {
  const iframe = document.getElementById("dinoIframe");
  if (!iframe || !iframe.contentWindow) return;

  const dinoData = {
    start: languages[lang]?.dinoStart || "Press Space to start",
    gameOver: languages[lang]?.dinoGameOver || "Game Over",
    highScore: languages[lang]?.dinoHighScore || "High Score"
  };

  iframe.contentWindow.postMessage({ type: "dino-language", data: dinoData }, "*");
}

ipcRenderer.on("change-language", (e, lang) => {
  languagesPromise.then(() => {
    updateLanguage(lang);
    // Update estimated size with new language
    const maxNumber = parseInt(document.getElementById("maxNumber").value) || 10000;
    const estimatedSize = calculateFileSize(maxNumber);
    const sizeLabel = languages[lang]?.estimatedSize || "Estimated size:";
    document.getElementById("fileSize").textContent = sizeLabel + " " + estimatedSize + " KB";

    // Update dino translation if dino overlay is open
    sendDinoLanguageToIframe(lang);
  });
});

// Load game scores from config
ipcRenderer.on("load-game-scores", (e, scores) => {
  gameScores = scores || {};
  console.log("[renderer] Loaded game scores:", gameScores);
});

function calculateFileSize(maxNumber, concat=false) {
  let size = 0;
  for (let i = 1; i <= maxNumber; i++) {
    size += String(i).length;
    if (!concat) size += 1; // newline separator
  }
  return (size / 1024).toFixed(2);
}

/* -------- RESET -------- */

function resetBackground() {
  cancelAnimationFrame(animationId);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  document.body.style.background = "none";
  document.body.style.backgroundImage = "none";
}

/* -------- COLOR -------- */

ipcRenderer.on("background-color", (e,color)=>{
  console.log("[renderer] background-color received", color);
  resetBackground();
  currentBackgroundImage = null; // no image is active
  document.body.style.background = color;
});

/* -------- IMAGE -------- */

ipcRenderer.on("background-image", (e,path)=>{
  console.log("[renderer] Received background-image message:", path);
  resetBackground();
  currentBackgroundImage = path; // remember image is active
  // Format the path correctly for Windows and encode special characters
  const formattedPath = path.replace(/\\/g, '/');
  const encodedPath = encodeURI(formattedPath);
  const imageUrl = `url("file:///${encodedPath}")`;
  console.log("[renderer] Image URL:", imageUrl);

  // Clear any existing background styles first
  document.body.style.background = "none";
  document.body.style.backgroundColor = "transparent";

  document.body.style.backgroundImage = imageUrl;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";

  // Add error handling for image loading
  const img = new Image();
  img.onload = () => console.log("[renderer] Image loaded successfully");
  img.onerror = () => console.error("[renderer] Failed to load image:", path);
  img.src = `file:///${encodedPath}`;
});
ipcRenderer.on("reset-background", (e)=>{
  resetBackground();
  currentBackgroundImage = null; // image is no longer active
});
/* -------- APPLY THEME -------- */

ipcRenderer.on("apply-theme", (e,data)=>{
  // Don't apply theme if image is active
  if (currentBackgroundImage) {
    console.log("[renderer] Theme not applied - image is active");
    return;
  }
  resetBackground();
  currentBackgroundImage = null; // no image is active
  currentThemeData = data; // remember for later
  if(data.name === "galactic") {
    setThemeBackground("#0b0d23");
    startGalactic(data.speed, data.starCount, data.starSize);
  }
  if(data.name === "matrix") {
    setThemeBackground("black");
    startMatrix(data.speed, data.direction, data.scrollDir, data.fontSize);
  }
  if(data.name === "ocean") {
    setThemeBackground("linear-gradient(135deg, #164a6b 0%, #0a2336 100%)");
    startOcean(data.bubbleSize, data.bubbleSpeed, data.bubbleDir);
  }
});

/* -------- GALACTIC -------- */

function generateGalacticStars(starCount, starSize) {
  const stars = [];
  for(let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * starSize
    });
  }
  return stars;
}

function startGalactic(speed=1, starCount=150, starSize=2){
  resizeCanvas();
  document.body.style.background = "#0b0d23"; // couleur galaxy
  galacticStars = generateGalacticStars(starCount, starSize);
  galacticAnimationData = { speed, starCount, starSize };
  
  function animate(){
    ctx.fillStyle = "#0b0d23";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    galacticStars.forEach(s => {
      s.y += speed;
      if(s.y > canvas.height) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
      ctx.fill();
    });
    animationId = requestAnimationFrame(animate);
  }
  animate();
}

/* -------- MATRIX -------- */

function startMatrix(speed=1, direction="vertical", scrollDir="down", fontSize=16){
  resizeCanvas();
  document.body.style.background = "black";
  const pattern = "01";
  const patternLength = pattern.length;
  
  // créer des vitesses différentes pour chaque ligne/colonne pour un meilleur effet
  const lineSpeeds = Array(patternLength).fill(0).map(() => (Math.random() * 0.4 + 0.8) * speed);
  let scrolls = Array(patternLength).fill(0);

  function draw(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#0F0";
    ctx.font=fontSize+"px monospace";
    ctx.textBaseline = "top";
    if(direction === "vertical"){
      const cycleHeight = patternLength * fontSize;
      const rows = Math.ceil(canvas.height / fontSize) + 2;
      const dir_mult = (scrollDir === "down") ? -1 : 1;
      for(let col = 0; col < patternLength; col++){
        scrolls[col] += lineSpeeds[col] * dir_mult;
        const y_offset = scrolls[col] % cycleHeight;
        for(let row = -1; row < rows; row++){
          const y = row * fontSize - y_offset;
          const charX = col * fontSize;
          const char = pattern[col];
          for(let px = 0; px < canvas.width; px += patternLength * fontSize){
            ctx.fillText(char, px + charX, y);
          }
        }
      }
    } else {
      const cycleWidth = patternLength * fontSize;
      const cols = Math.ceil(canvas.width / fontSize) + 2;
      const dir_mult = (scrollDir === "right") ? -1 : 1;
      for(let row = 0; row < patternLength; row++){
        scrolls[row] += lineSpeeds[row] * dir_mult;
        const x_offset = scrolls[row] % cycleWidth;
        for(let col = -1; col < cols; col++){
          const x = col * fontSize - x_offset;
          const charY = row * fontSize;
          const char = pattern[row];
          for(let py = 0; py < canvas.height; py += patternLength * fontSize){
            ctx.fillText(char, x, py + charY);
          }
        }
      }
    }
    animationId = requestAnimationFrame(draw);
  }
  draw();
}

/* -------- RESIZE CANVAS -------- */

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Regenerate stars if galactic theme is active
  if (galacticAnimationData && galacticStars.length > 0) {
    galacticStars = generateGalacticStars(
      galacticAnimationData.starCount, 
      galacticAnimationData.starSize
    );
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* -------- SELECT FOLDER -------- */

let selectedFolder = null;

document.getElementById("selectFolderBtn").addEventListener("click", async () => {
  const folderPath = await ipcRenderer.invoke("select-folder");
  
  if (folderPath) {
    selectedFolder = folderPath;
    document.getElementById("folderPath").textContent = "📁 " + folderPath;
  }
});

/* -------- CALCULATE AND SHOW ESTIMATED SIZE -------- */

document.getElementById("maxNumber").addEventListener("input", () => {
  const maxNumber = parseInt(document.getElementById("maxNumber").value) || 10000;
  const estimatedSize = calculateFileSize(maxNumber);
  const sizeLabel = languages[currentLanguage]?.estimatedSize || "Estimated size:";
  document.getElementById("fileSize").textContent = sizeLabel + " " + estimatedSize + " KB";
});

/* -------- GENERATE FILE -------- */

document.getElementById("generateBtn").addEventListener("click", async () => {
  if (!selectedFolder) {
    const msg = languages[currentLanguage]?.noFolder || "Please select a folder first!";
    alert(msg);
    return;
  }

  const maxNumber = parseInt(document.getElementById("maxNumber").value) || 10000;
  const fileName = document.getElementById("fileName").value || "numbers";

  const result = await ipcRenderer.invoke("generate-file", {
    folderPath: selectedFolder,
    fileName: fileName,
    maxNumber: maxNumber
  });

  if (result.success) {
    document.getElementById("fileSize").textContent = "✓ File created: " + result.size + " KB";
  } else {
    document.getElementById("fileSize").textContent = "✗ Error: " + result.error;
  }
});

/* -------- OCEAN -------- */

let oceanPopCount = 0; // count of popped bubbles (persistent between runs)
let dinoGameActive = false; // track if dino game is running

function showDinoOverlay() {
  if (dinoGameActive) return;
  dinoGameActive = true;
  
  // Create overlay
  let overlay = document.createElement("div");
  overlay.id = "dinoOverlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: 10000,
    background: "rgba(0,0,0,0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  });
  
  // Create iframe
  const iframe = document.createElement("iframe");
  iframe.id = "dinoIframe";
  const hiScore = gameScores.chromeDinoHiScore || 0;
  iframe.src = `./chrome_dino_official/chrome_dino.html?hiScore=${hiScore}&lang=${encodeURIComponent(currentLanguage)}`;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.backgroundColor = "white";

  iframe.onload = () => {
    sendDinoLanguageToIframe(currentLanguage);
  };

  overlay.appendChild(iframe);
  document.body.appendChild(overlay);

  // Close on Escape key
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      closeDinoGame();
    }
  }
  window.addEventListener("keydown", handleKeyDown);
  
  // Monitor for game over (check if overlay still exists and close)
  const checkGameOver = setInterval(() => {
    if (!document.getElementById("dinoOverlay")) {
      clearInterval(checkGameOver);
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, 500);
  
  window.closeDinoGameFromIframe = function() {
    closeDinoGame();
  };
}

function closeDinoGame() {
  const overlay = document.getElementById("dinoOverlay");
  if (overlay) {
    overlay.remove();
  }
  dinoGameActive = false;
  oceanPopCount = 0;
  
  // Restart ocean theme to reset bubbles
  startOcean(80, 1, "up");
}

// Save Chrome Dino high score to main process
window.saveDinoHighScore = function(score) {
  const { ipcRenderer } = require("electron");
  if (score && !isNaN(score)) {
    ipcRenderer.send("save-dino-high-score", Math.floor(score));
    console.log("[renderer] Sent high score to main:", Math.floor(score));
  }
};

function startOcean(bubbleSize=80, bubbleSpeed=1, bubbleDir="up") {
  resizeCanvas();
  document.body.style.background = "#0a2336";
  const bubbleCount = 8;
  let bubbles = [];
  let particles = [];
  for(let i=0;i<bubbleCount;i++){
    bubbles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: bubbleSize * (0.7 + Math.random()*0.6),
      vx: (bubbleDir==="left"?-1:bubbleDir==="right"?1:0) * bubbleSpeed * (0.5+Math.random()),
      vy: (bubbleDir==="up"?-1:bubbleDir==="down"?1:0) * bubbleSpeed * (0.5+Math.random())
    });
  }
  let mouse = {x:-1000, y:-1000};
  canvas.onmousemove = e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };
  canvas.onmouseleave = () => { mouse.x = -1000; mouse.y = -1000; };
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let grad = ctx.createLinearGradient(0,0,0,canvas.height);
    grad.addColorStop(0,"#164a6b");
    grad.addColorStop(1,"#0a2336");
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // effet particules
    for(let p of particles){
      ctx.save();
      ctx.globalAlpha = p.life/30;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = "#b8e6ff";
      ctx.fill();
      ctx.restore();
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
    }
    particles = particles.filter(p=>p.life>0);
    for(let i=0;i<bubbles.length;i++){
      let b = bubbles[i];
      let dist = Math.hypot(mouse.x-b.x, mouse.y-b.y);
      // Block bubble popping if dino game is active
      if (dist < b.r && !dinoGameActive) {
        // éclatement : ajoute des particules
        for(let k=0;k<12;k++){
          let angle = Math.random()*Math.PI*2;
          let speed = Math.random()*3+1;
          particles.push({
            x: b.x,
            y: b.y,
            r: Math.random()*6+2,
            vx: Math.cos(angle)*speed,
            vy: Math.sin(angle)*speed,
            life: 30+Math.random()*10
          });
        }
        // increment pop count and possibly trigger dino
        oceanPopCount++;
        console.log('[renderer] ocean bubble popped, count=', oceanPopCount);
        if (oceanPopCount >= 150) {
          oceanPopCount = 0;
          showDinoOverlay();
        }
        bubbles[i] = {
          x: Math.random()*canvas.width,
          y: bubbleDir==="up" ? canvas.height+b.r : bubbleDir==="down" ? -b.r : Math.random()*canvas.height,
          r: bubbleSize * (0.7 + Math.random()*0.6),
          vx: (bubbleDir==="left"?-1:bubbleDir==="right"?1:0) * bubbleSpeed * (0.5+Math.random()),
          vy: (bubbleDir==="up"?-1:bubbleDir==="down"?1:0) * bubbleSpeed * (0.5+Math.random())
        };
        continue;
      }
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx.strokeStyle = "#b8e6ff";
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#b8e6ff";
      ctx.fill();
      ctx.restore();
      b.x += b.vx;
      b.y += b.vy;
      if(bubbleDir==="up" && b.y+b.r<0){ b.y = canvas.height+b.r; b.x = Math.random()*canvas.width; }
      if(bubbleDir==="down" && b.y-b.r>canvas.height){ b.y = -b.r; b.x = Math.random()*canvas.width; }
      if(bubbleDir==="left" && b.x+b.r<0){ b.x = canvas.width+b.r; b.y = Math.random()*canvas.height; }
      if(bubbleDir==="right" && b.x-b.r>canvas.width){ b.x = -b.r; b.y = Math.random()*canvas.height; }
    }
    animationId = requestAnimationFrame(draw);
  }
  draw();
}

/* -------- CALCULATOR -------- */

function setThemeBackground(bg) {
  document.body.style.background = bg;
  currentThemeBg = bg;
}

function applyCurrentTheme() {
  // Don't apply theme if image is active
  if (currentBackgroundImage) {
    console.log("[renderer] Theme not reapplied - image is active");
    return;
  }
  if (!currentThemeData) return;
  // cancel any existing animation just in case
  resetBackground();
  const data = currentThemeData;
  switch (data.name) {
    case "galactic":
      setThemeBackground("#0b0d23");
      startGalactic(data.speed, data.starCount, data.starSize);
      break;
    case "matrix":
      setThemeBackground("black");
      startMatrix(data.speed, data.direction, data.scrollDir, data.fontSize);
      break;
    case "ocean":
      setThemeBackground("linear-gradient(135deg, #164a6b 0%, #0a2336 100%)");
      startOcean(data.bubbleSize, data.bubbleSpeed, data.bubbleDir);
      break;
  }
}

document.getElementById("calcBtn").onclick = () => {
  // avoid opening twice
  if (document.getElementById("calcOverlay")) return;
  // hide estimated size field
  const fileSize = document.getElementById("fileSize");
  if (fileSize) fileSize.style.display = "none";
  // create an empty overlay immediately to block further clicks
  let overlay = document.createElement("div");
  overlay.id = "calcOverlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: 9999,
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    pointerEvents: "none"
  });
  document.body.appendChild(overlay);
  // load calculator into overlay so background canvas stays
  fetch("calculatrice.html?" + Date.now())
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // insert calculator styles into head (with identifier for later removal)
      const style = document.createElement("style");
      style.id = "calc-styles";
      style.textContent = [...doc.head.querySelectorAll('style')].map(s => s.textContent).join("\n");
      document.head.appendChild(style);

      // create overlay container
      let overlay = document.getElementById("calcOverlay");
      // overlay already created above

      // remove any script tags from fetched body before injecting
      doc.body.querySelectorAll('script').forEach(s=>s.remove());
      overlay.innerHTML = doc.body.innerHTML;
      
      // Enable pointer events for the calculator container so it can receive clicks
      const calcContainer = overlay.querySelector("#calc-container");
      if (calcContainer) {
        calcContainer.style.pointerEvents = "auto";
      }
      
      // hide the main container
      const mainContainer = document.querySelector(".container");
      if (mainContainer) {
        mainContainer.style.display = "none";
      }
      
      // hide main generator controls while calculator is open
      document.getElementById("selectFolderBtn").style.display = "none";
      document.getElementById("generateBtn").style.display = "none";
      document.getElementById("maxNumber").style.display = "none";
      document.getElementById("fileName").style.display = "none";
      const labels = document.querySelectorAll("label");
      labels.forEach(l=> l.style.display = "none");
      // also hide folder path and file size
      const folderPath = document.getElementById("folderPath");
      if(folderPath) folderPath.style.display = "none";

      // append calculator script inside overlay (cache‑busted)
      const script = document.createElement("script");
      script.src = "calculatrice.js?" + Date.now();
      overlay.appendChild(script);
    })
    .catch(err => {
      console.error("Échec du chargement de la calculatrice", err);
    });
};

window.addEventListener("message", function(e) {
  if(e.data === "backToMain") {
    // remove overlay and calculator styles
    const overlay = document.getElementById("calcOverlay");
    if (overlay) overlay.remove();
    const calcStyles = document.getElementById("calc-styles");
    if (calcStyles) calcStyles.remove();
    // reset the calculator loaded flag so it can be opened again
    window.calculatorLoaded = false;
    // show main container again
    const mainContainer = document.querySelector(".container");
    if (mainContainer) {
      mainContainer.style.display = "";
    }
    // show generator controls again
    document.getElementById("selectFolderBtn").style.display = "";
    document.getElementById("generateBtn").style.display = "";
    document.getElementById("maxNumber").style.display = "";
    document.getElementById("fileName").style.display = "";
    const labels = document.querySelectorAll("label");
    labels.forEach(l=> l.style.display = "");
    const folderPath = document.getElementById("folderPath");
    if(folderPath) folderPath.style.display = "";
    const fileSize = document.getElementById("fileSize");
    if(fileSize) fileSize.style.display = "";
    // reapply theme if needed
    applyCurrentTheme();
  }
});

function showMainInterface() {
  fetch('index.html')
    .then(response => response.text())
    .then(html => {
      document.body.innerHTML = html;
      document.body.style.background = currentThemeBg;
      applyCurrentTheme();
      // Réattache les listeners nécessaires ici si besoin
    });
}