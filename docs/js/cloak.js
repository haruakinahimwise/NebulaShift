let isCloaked = true;

function applyCloak() {
  const cloak = document.getElementById("cloak-root");
  const app = document.getElementById("app-root");

  if (isCloaked) {
    document.title = "Googl";
    document.getElementById("favicon").href = "googl-favicon.png";
    cloak.classList.remove("hidden");
    app.classList.add("hidden");
  } else {
    document.title = "NebulaShift";
    document.getElementById("favicon").href = "nebula-favicon.png";
    cloak.classList.add("hidden");
    app.classList.remove("hidden");
  }
}

function initCloak() {
  applyCloak();

  window.addEventListener("keydown", e => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "x") {
      isCloaked = !isCloaked;
      applyCloak();
    }
  });

  window.addEventListener("blur", () => {
    isCloaked = true;
    applyCloak();
  });
}

export { initCloak };
