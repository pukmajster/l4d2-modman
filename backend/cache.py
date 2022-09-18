"""
Extracts mod info from all installed mods in the game's directory
"""

import json
import os

import vdf
import vpk
from constants import *

# -----------------------------------------------------------------
# Constants
# -----------------------------------------------------------------

# Common files found in VPKs that should not result in mod conflictions
commonVpkAddonFiles = [ "addoninfo.txt", "addonimage.jpg" ]

# Parse config.json
config_f = open("../config.json");
config = json.load(config_f);
config_f.close()

categories_f = open("filechange_types.json");
categories = json.load(categories_f);
categories_f.close()

# -----------------------------------------------------------------
# addoninfo.txt caching
# -----------------------------------------------------------------

# Some mods pack extra metadata we don't really care about
acceptedMetaKeys = [
    'addontitle',
    'addonversion',
    'addontagline',
    'addonauthor',
    'addonauthorsteamid',
    'addondescription',
    'addoncontent_backgroundmovie' 
	'addoncontent_bossinfected',
	'addoncontent_campaign',
	'addoncontent_commoninfected',
	'addoncontent_map',
	'addoncontent_music',
	'addoncontent_prefab',
	'addoncontent_prop',
	'addoncontent_script',
	'addoncontent_skin',
	'addoncontent_sound',
	'addoncontent_spray',
	'addoncontent_survivor',
	'addoncontent_weapon',
	'addoncontent_weaponmodel'
]

def buildCacheFromDirectory(dir):
    cache = {}

    for file in os.listdir(dir):
        if file.endswith(".vpk"):
        
            # Open the VPK and snatch the addoninfo.txt file
            pakpath = os.path.join(dir, file)
            pak = vpk.open(pakpath)
        
            # Some paks don't contain an addoninfo.txt for some reason...
            if("addoninfo.txt" in pak):

                addoninfo = pak.get_file("addoninfo.txt")
                addoninfo_data = addoninfo.read().decode("utf-8")

                addonId = file.split('.')[0]
                
                thisMod = {}
                thisMod["id"] = addonId

                # Read the mod metadata
                try:
                    d = vdf.loads(addoninfo_data)
                    addonInfoItems = d['AddonInfo']

                    # Some mods don't respect capitalizations so we just make all keys lowercase
                    for item in addonInfoItems:
                        key = item.lower()

                        keyValue = addonInfoItems[item]
                        if key in acceptedMetaKeys:
                            if keyValue != "0":
                                thisMod[key] = addonInfoItems[item]

                except:
                    print("Error: ")
                    thisMod["error"] = "Unidentifiable mod: Corrupt addoninfo.txt"

                # Get all mod files
                thisMod["files"] = []
                thisMod["categories"] = []
                for filepath in pak:
                    if(filepath not in commonVpkAddonFiles):
                        thisMod["files"].append(filepath)

                        if thisMod["addoncontent_campaign"] == "1":
                            thisMod["categories"].append("Campaign");
                        
                        # Apply categories based on the files the mod alters
                        for categoryTerm in categories:
                            if categoryTerm in filepath:
                                categoryNames = categories[categoryTerm];
                                for categoryName in categoryNames:
                                    if categoryName not in thisMod["categories"]:
                                        thisMod["categories"].append(categoryName);

                # Saves the mod to the list
                cache[addonId] = thisMod
    return cache

def buildCache():
    cache = {
        "workshop": buildCacheFromDirectory(GAME_WORKSHOP_ADDONS_DIR),
        "local": buildCacheFromDirectory(GAME_LOCAL_ADDONS_DIR)
    }

    cache_f = open(MODMAN_CACHE_DIR, 'w')
    json.dump(cache, cache_f, indent=2) # TODO Remove indent for performance
    cache_f.close()
