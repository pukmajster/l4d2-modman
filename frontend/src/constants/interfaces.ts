export interface Mod {
  id: string;
  addontitle?: string;
  addonversion?: string;
  addonauthor?: string;
  addontagline?: string;
  addonauthorsteamid?: string;
  addondescription?: string;
  files: string[];
  addoncontent_backgroundmovie?: string;
  addoncontent_bossinfected?: string;
  addoncontent_campaign?: string;
  addoncontent_commoninfected?: string;
  addoncontent_map?: string;
  addoncontent_music?: string;
  addoncontent_prefab?: string;
  addoncontent_prop?: string;
  addoncontent_script?: string;
  addoncontent_skin?: string;
  addoncontent_sound?: string;
  addoncontent_spray?: string;
  addoncontent_survivor?: string;
  addoncontent_weapon?: string;
  addoncontent_weaponmodel?: string;
  error?: string;
  categories?: string[];
  timeModified: string;
}

export interface ModCache {
  [key: string]: Mod;
}
