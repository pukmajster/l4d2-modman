import { showModmanConfigDialogAtom } from "@/state/dialogs";
import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useRecoilState } from "recoil";

import useProfileProperty from "@/hooks/useProfileProperty";
import { profileSelectedPresetIdAtom } from "@/state/profile";
import CachedIcon from "@mui/icons-material/Cached";

import { ModCache } from "@/constants/interfaces";
import { requestCache } from "@/functions/requestCache";
import { cacheAtom } from "@/state/cache";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect } from "react";
import SettingsDialog from "./SettingsDialog";
import Writer from "./Writer";

export default function Header() {
  const [cache, setCache] = useRecoilState(cacheAtom);
  const [, setOpen] = useRecoilState(showModmanConfigDialogAtom);
  const [preset, setPreset] = useProfileProperty(
    "selectedPreset",
    profileSelectedPresetIdAtom
  );

  function openSettingsDialog() {
    setOpen(true);
  }

  function updateCacheOnRequest() {
    requestCache(true, (c: ModCache) => setCache(c));
  }

  // Request cache on startup
  useEffect(() => {
    requestCache(false, (c: ModCache) => setCache(c));
  }, []);

  return (
    <>
      <Box p={1} borderBottom="1px solid #323232">
        <Stack direction="row" justifyContent="space-between">
          <Stack spacing={1} direction="row" alignItems={"center"}>
            <Button onClick={openSettingsDialog} startIcon={<SettingsIcon />}>
              Settings
            </Button>
            <Button onClick={updateCacheOnRequest} startIcon={<CachedIcon />}>
              Refresh
            </Button>
            <Writer />
          </Stack>

          <Button disabled startIcon={<FolderIcon />}>
            preset: {preset}
          </Button>
        </Stack>
      </Box>

      <SettingsDialog />
    </>
  );
}
