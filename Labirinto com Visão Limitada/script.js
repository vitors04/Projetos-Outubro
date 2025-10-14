const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellSize = 20;
const mazeWidth = Math.floor(canvas.width / cellSize);
const mazeHeight = Math.floor(canvas.height / cellSize);
const viewRadius = 4;

let maze = [];
let player = { x: 0, y: 0 };
let exitPos = { x: mazeWidth - 2, y: mazeHeight - 2 };
let showHint = false;
let hintStart = 0;
let hintParticles = [];
let gameWon = false;
let showFullMap = false;
let showFullMapStart = 0;

const hintDuration = 2000;
const fadeDuration = 1000;
const fullMapDuration = 2000;

function generateMaze() {
  const maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(1));
  const stack = [];
  let current = { x: 0, y: 0 };

  maze[current.y][current.x] = 0;
  stack.push(current);

  const directions = [
    { x: 0, y: -2 },
    { x: 2, y: 0 },
    { x: 0, y: 2 },
    { x: -2, y: 0 },
  ];

  while (stack.length > 0) {
    const neighbors = [];

    for (const dir of directions) {
      const nx = current.x + dir.x;
      const ny = current.y + dir.y;
      if (
        nx >= 0 &&
        nx < mazeWidth &&
        ny >= 0 &&
        ny < mazeHeight &&
        maze[ny][nx] === 1
      ) {
        const midX = current.x + dir.x / 2;
        const midY = current.y + dir.y / 2;
        if (maze[midY][midX] === 1) {
          neighbors.push({ x: nx, y: ny, midX, midY });
        }
      }
    }

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      maze[next.midY][next.midX] = 0;
      maze[next.y][next.x] = 0;
      stack.push(current);
      current = next;
    } else {
      current = stack.pop();
    }
  }

  maze[mazeHeight - 2][mazeWidth - 2] = 0;
  return maze;
}

function gerarParticulasHint() {
  hintParticles = [];
  const qtd = 40;
  for (let i = 0; i < qtd; i++) {
    const ang = Math.random() * Math.PI * 2;
    const dist = Math.random() * (cellSize * 0.8);
    hintParticles.push({
      x: exitPos.x * cellSize + cellSize / 2 + Math.cos(ang) * dist,
      y: exitPos.y * cellSize + cellSize / 2 + Math.sin(ang) * dist,
      r: Math.random() * 2 + 1,
      a: Math.random() * 0.5 + 0.5,
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < mazeHeight; y++) {
    for (let x = 0; x < mazeWidth; x++) {
      ctx.fillStyle = maze[y][x] === 1 ? "#333" : "#000";
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

  if (!showFullMap) {
    const gradient = ctx.createRadialGradient(
      player.x * cellSize + cellSize / 2,
      player.y * cellSize + cellSize / 2,
      0,
      player.x * cellSize + cellSize / 2,
      player.y * cellSize + cellSize / 2,
      viewRadius * cellSize
    );
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (Date.now() - showFullMapStart > fullMapDuration) {
    showFullMap = false;
  }

  // Jogador
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    player.x * cellSize + cellSize / 2,
    player.y * cellSize + cellSize / 2,
    cellSize / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Partículas de dica
  if (showHint) {
    const elapsed = Date.now() - hintStart;
    if (elapsed < hintDuration + fadeDuration) {
      const alphaFactor =
        elapsed < hintDuration ? 1 : 1 - (elapsed - hintDuration) / fadeDuration;
      hintParticles.forEach((p) => {
        ctx.fillStyle = `rgba(255, 215, 0, ${p.a * alphaFactor})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      showHint = false;
    }
  }

  if (gameWon) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f0";
    ctx.font = "48px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Você venceu!", canvas.width / 2, canvas.height / 2);
  }
}

document.addEventListener("keydown", (event) => {
  const moveX =
    event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
  const moveY =
    event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
  const newX = player.x + moveX;
  const newY = player.y + moveY;

  if (maze[newY] && maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
  }

  if (player.x === exitPos.x && player.y === exitPos.y && !gameWon) {
    gameWon = true;
    setTimeout(() => {
      maze = generateMaze();
      player = { x: 0, y: 0 };
      exitPos = { x: mazeWidth - 2, y: mazeHeight - 2 };
      gameWon = false;
    }, 3000);
  }
});

const hintButton = document.getElementById("hintButton");
hintButton.addEventListener("click", () => {
  showHint = true;
  hintStart = Date.now();
  gerarParticulasHint();
});

const revealButton = document.getElementById("revealButton");
revealButton.addEventListener("click", () => {
  showFullMap = true;
  showFullMapStart = Date.now();
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  maze = generateMaze();
  player = { x: 0, y: 0 };
});

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

maze = generateMaze();
gameLoop();

