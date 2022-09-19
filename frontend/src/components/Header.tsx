import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";

import CachedIcon from "@mui/icons-material/Cached";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Header() {
  return (
    <Box p={1} borderBottom="1px solid #323232">
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={1} direction="row">
          <Button startIcon={<SettingsIcon />}>SETTING</Button>
          <Button startIcon={<CachedIcon />}>build cache</Button>
          <Button startIcon={<CachedIcon />}>refresh cache</Button>
        </Stack>

        <Button startIcon={<FolderIcon />}>preset</Button>
      </Stack>
    </Box>
  );
}
