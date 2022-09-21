import { showModmanConfigDialogAtom } from "@/state/dialogs";
import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useRecoilState } from "recoil";

import useProfileProperty from "@/hooks/useProfileProperty";
import { profileSelectedPresetAtom } from "@/state/profile";
import CachedIcon from "@mui/icons-material/Cached";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsDialog from "./SettingsDialog";

export default function Header() {
  const [, setOpen] = useRecoilState(showModmanConfigDialogAtom);
  const [preset, setPreset] = useProfileProperty(
    "selectedPreset",
    profileSelectedPresetAtom
  );

  function openSettingsDialog() {
    setOpen(true);
  }

  return (
    <>
      <Box p={1} borderBottom="1px solid #323232">
        <Stack direction="row" justifyContent="space-between">
          <Stack spacing={1} direction="row">
            <Button onClick={openSettingsDialog} startIcon={<SettingsIcon />}>
              Settings
            </Button>
            <Button startIcon={<CachedIcon />}>build cache</Button>
            <Button startIcon={<CachedIcon />}>refresh cache</Button>
          </Stack>

          <Button startIcon={<FolderIcon />}>preset: {preset}</Button>
        </Stack>
      </Box>

      <SettingsDialog />
    </>
  );
}
