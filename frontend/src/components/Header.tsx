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
              {requestingCache ? "working..." : "Detect mods"}
            </Button>
            <Writer />

            <Stack direction="row" alignItems={"center"} pl={2}>
              <Typography variant="button" fontSize={17}>
                {Object.keys(cache)?.length}
              </Typography>
              <Typography variant="caption" lineHeight={1.2} pl={0.5} pt={0.4}>
                mods installed
              </Typography>

              <Box mr={3}></Box>

              <Typography variant="button" fontSize={17}>
                {preset?.enabledMods?.length}
              </Typography>
              <Typography variant="caption" lineHeight={1.2} pl={0.5} pt={0.4}>
                mods enabled
              </Typography>
            </Stack>

            {/* <Stack justifyContent={"center"} direction="row">
              <Typography variant="caption" lineHeight={1.2}>
                Installed mods: <b>{Object.keys(cache)?.length}</b>
              </Typography>

              <Typography variant="caption" lineHeight={1.2}>
                Enabled mods:&nbsp;&nbsp;
                <b>{preset?.enabledMods?.length}</b>
              </Typography>
            </Stack> */}
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
