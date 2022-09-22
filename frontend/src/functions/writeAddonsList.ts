import { Preset } from "@/state/profile";
import { Cache } from "@/temp/workshop";

export async function writeAddons(
  cache: Cache,
  preset: Preset,
  gameDir: string
) {
  let outputVdfString = `"AddonList"\n{\n`;

  for (let mod in cache) {
    let modId = cache[mod].id;
    let enabled = preset.enabledMods.includes(modId) ? "1" : "0";
    outputVdfString += `\t"workshop/${modId}.vpk"\t\t\t"${enabled}"\n`;
  }

  outputVdfString += "}";
  // console.log(outputVdfString);

  let res = await window.addonInfoApi.writeAddonInfo(gameDir, outputVdfString);
  console.log(res);

  return res;
}
