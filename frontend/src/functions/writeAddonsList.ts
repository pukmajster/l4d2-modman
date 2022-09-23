import { ModCache } from "@/constants/interfaces";
import { Preset } from "@/state/profile";

export async function writeAddons(
  cache: ModCache,
  preset: Preset,
  gameDir: string
) {
  let outputVdfString = `"AddonList"\n{\n`;

  for (let mod in cache) {
    let modId = cache[mod].id;
    let enabled = preset.enabledMods.includes(modId) ? "1" : "0";
    outputVdfString += `\t"workshop\\${modId}.vpk"\t\t\t"${enabled}"\n`;
  }

  outputVdfString += "}";
  let res = await window.addonInfoApi.writeAddonInfo(gameDir, outputVdfString);
  return res;
}
