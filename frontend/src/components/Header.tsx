import {
  showModmanConfigDialogAtom,
  showPresetsDialogAtom,
} from "@/state/dialogs";
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useRecoilState } from "recoil";

import useProfileProperty from "@/hooks/useProfileProperty";
import {
  profileSelectedPresetAtom,
  profileSelectedPresetIdAtom,
} from "@/state/profile";
import CachedIcon from "@mui/icons-material/Cached";

import { requestCache } from "@/functions/requestCache";
import { cacheAtom } from "@/state/cache";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
import SettingsDialog from "./SettingsDialog";
import Writer from "./Writer";

export default function Header() {
  const [cache, setCache] = useRecoilState(cacheAtom);
  const [, setOpen] = useRecoilState(showModmanConfigDialogAtom);
  const [presetName] = useProfileProperty(
    "selectedPreset",
    profileSelectedPresetIdAtom
  );
  const [preset] = useRecoilState(profileSelectedPresetAtom);

  const [showPresetsDialog, setShowPresetsDialog] = useRecoilState(
    showPresetsDialogAtom
  );

  function openPresetsDialog() {
    setShowPresetsDialog(true);
  }

  const [requestingCache, setRequestingCache] = useState(false);

  function openSettingsDialog() {
    setOpen(true);
  }

  async function updateCacheOnRequest() {
    baseCacheRequest(true);
  }

  // Request cache on startup
  useEffect(() => {
    baseCacheRequest(false);
  }, []);

  async function baseCacheRequest(forceNewBuild: boolean) {
    try {
      setRequestingCache(true);
      let newCache = await requestCache(forceNewBuild);
      setCache(newCache);
    } catch (e) {
      console.log(e);
    } finally {
      setRequestingCache(false);
    }
  }

  return (
    <>
      <Box p={1} borderBottom="1px solid #323232">
        <Stack direction="row" justifyContent="space-between">
          <Stack spacing={1} direction="row" alignItems={"center"}>
            <Button onClick={openSettingsDialog} startIcon={<SettingsIcon />}>
              Settings
            </Button>
            <Button
              disabled={requestingCache}
              onClick={updateCacheOnRequest}
              startIcon={<CachedIcon />}
            >
              {requestingCache ? "working..." : "refresh"}
            </Button>
            <Writer />

            <Stack>
              <Typography variant="caption">
                Installed mods: {Object.keys(cache)?.length}
              </Typography>

              <Typography variant="caption">
                Enabled mods: {preset?.enabledMods?.length}
              </Typography>
            </Stack>
          </Stack>

          <Button
            hidden
            disabled
            onClick={openPresetsDialog}
            startIcon={<FolderIcon />}
          >
            preset: {presetName}
          </Button>
        </Stack>
      </Box>

      <SettingsDialog />
    </>
  );
}
