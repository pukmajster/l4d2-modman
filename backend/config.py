"""Interface for dealing with modman's config file"""

import json
import os

from constants import *

defaultConfigData = {
  "gameDir": ""
}

def writeDefaultConfig(): 
  config_f = open(MODMAN_CONFIG_DIR, 'w')
  json.dump(defaultConfigData, config_f, indent=2)
  config_f.close()

def writeConfig(jsonString):
  if(os.path.isfile(MODMAN_CONFIG_DIR)):
    writeDefaultConfig()

  config_f = open(MODMAN_CONFIG_DIR, 'w')
  json.dump(json.loads(jsonString), config_f, indent=2)
  config_f.close()

def readConfig():
  if(os.path.isfile(MODMAN_CONFIG_DIR)):
    writeDefaultConfig()

  config_f = open(MODMAN_CONFIG_DIR, 'r')
  config = json.load(config_f)
  config_f.close()
  return config
  
def readConfigAsString():
  config = readConfig()
  return json.dumps(config)

def GAME_WORKSHOP_ADDONS_DIR(config):
  return config["gameDir"] + "/addons/workshop/"

def GAME_LOCAL_ADDONS_DIR(config):
  return config["gameDir"] + "/addons/"
  