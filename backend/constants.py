"""Various static file paths modman deals with"""
import os

MODMAN_APPDATA_DIR = os.path.expanduser('~/.modman')
MODMAN_CONFIG_DIR = os.path.expanduser('~/.modman/config.json')
MODMAN_PROFILE_DIR = os.path.expanduser('~/.modman/profiles/default.json')
MODMAN_CACHE_DIR = os.path.expanduser('~/.modman/cache.json')

GAME_DIR = ""
GAME_WORKSHOP_ADDONS_DIR = GAME_DIR + "/addons/workshop/"
GAME_LOCAL_ADDONS_DIR = GAME_DIR + "/addons/"
