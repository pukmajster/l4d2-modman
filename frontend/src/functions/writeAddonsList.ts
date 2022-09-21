import { Preset } from "@/state/profile";
import { Cache } from "@/temp/workshop";

export async function writeAddons(cache: Cache, preset: Preset) {
  let outputVdfString = `"Addons"\n{\n`;

  for (let mod in cache) {
    let modId = cache[mod].id;
    let enabled = preset.enabledMods.includes(modId) ? "1" : "0";
    outputVdfString += `\t"workshop/${modId}"\t\t\t"${enabled}"\n`;
  }

  outputVdfString += "}";

  console.log(outputVdfString);
}
