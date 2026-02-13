import fs from "node:fs";
import path from "node:path";

const CONFIG_FILE = ".prototype.json";
const configPath = path.resolve(process.cwd(), CONFIG_FILE);

// Skip setup if config already exists
if (fs.existsSync(configPath)) {
  process.exit(0);
}

const isInteractive = process.stdin.isTTY === true;

async function main() {
  let name = "My Prototype";

  if (isInteractive) {
    const { intro, outro, text, isCancel, cancel } = await import(
      "@clack/prompts"
    );

    intro("Welcome to Secret Squirrel — let's set up your prototype");

    const projectName = await text({
      message: "What is your project name?",
      placeholder: "My Prototype",
      defaultValue: "My Prototype",
      validate(value) {
        if (!value.trim()) return "Project name cannot be empty.";
      },
    });

    if (isCancel(projectName)) {
      cancel("Setup cancelled. Run pnpm dev again to restart.");
      process.exit(1);
    }

    name = projectName.trim();
    outro(`You're all set! "${name}" is ready to go.`);
  } else {
    console.log(
      `Non-interactive environment detected — using default name: "${name}"`
    );
  }

  // --- Write config file ---
  const config = { name };
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");

  // --- Update index.html <title> ---
  const indexHtmlPath = path.resolve(process.cwd(), "index.html");
  if (fs.existsSync(indexHtmlPath)) {
    let html = fs.readFileSync(indexHtmlPath, "utf-8");
    html = html.replace(/<title>.*<\/title>/, `<title>${name}</title>`);
    fs.writeFileSync(indexHtmlPath, html);
  }

  // --- Update home page heading ---
  const homePath = path.resolve(process.cwd(), "src/pages/home.tsx");
  if (fs.existsSync(homePath)) {
    let home = fs.readFileSync(homePath, "utf-8");
    home = home.replace("Secret Squirrel", name);
    fs.writeFileSync(homePath, home);
  }
}

main().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
