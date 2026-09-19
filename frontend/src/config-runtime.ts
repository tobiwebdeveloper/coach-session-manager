import { buildPresetCSS, buildThemeCSS, normalizePreset } from "@paraxe/cli";
import rawConfig from "../paraxe.config.json";

const config = rawConfig as {
  preset: Parameters<typeof normalizePreset>[0];
};

const preset = normalizePreset(config.preset);

export function applyRuntimeStyles(): void {
  const existing = document.querySelectorAll("style[data-paraxe-runtime]");
  existing.forEach((element) => element.remove());

  for (const content of [buildPresetCSS(preset), buildThemeCSS(preset)]) {
    const style = document.createElement("style");
    style.dataset.paraxeRuntime = "true";
    style.textContent = content;
    document.head.appendChild(style);
  }
}

if (import.meta.hot) {
  import.meta.hot.accept("../paraxe.config.json", () => {
    window.location.reload();
  });
}

export { preset };