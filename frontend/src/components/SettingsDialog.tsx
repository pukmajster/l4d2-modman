import useConfigProperty from "@/hooks/useConfigProperty";
import { allowNetworkModFetchAtom, gameDirAtom } from "@/state/config";
import { showModmanConfigDialogAtom } from "@/state/dialogs";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";

export default function SettingsDialog() {
  const [gameDir, setGameDir] = useConfigProperty<string>(
    "gameDir",
    gameDirAtom
  );
  const [allowNetworkModFetch, setAllowNetworkModFetch] =
    useConfigProperty<boolean>(
      "allowNetworkModFetch",
      allowNetworkModFetchAtom
    );
  const [open, setOpen] = useRecoilState(showModmanConfigDialogAtom);

  function handleOnClose() {
    setOpen(false);
  }

  async function handleNewDirectory() {
    let dir = await window.dialogApi.selectFolder();
    if (!dir) return;
    setGameDir(dir);
  }

  async function handleAllowNetworkModFetchToggle() {
    setAllowNetworkModFetch((old) => !old);
  }

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Stack>
          <Typography variant="button">Game directory</Typography>
          <Typography variant="caption">
            This directory is crucial for modman to detect and show your
            installed mods
          </Typography>
          <TextField
            disabled
            label="Game directory"
            value={gameDir}
            onChange={(e) => setGameDir(e.target.value)}
          ></TextField>

          <Stack direction="row" justifyContent={"end"}>
            <Button startIcon={<FolderIcon />} onClick={handleNewDirectory}>
              SELECT DIRECTROY
            </Button>
          </Stack>
          <Box mt={4}></Box>
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography variant="button">Network AddonInfo fetching</Typography>

            <Switch
              checked={allowNetworkModFetch}
              onClick={handleAllowNetworkModFetchToggle}
            ></Switch>
          </Stack>

          <Typography variant="caption">
            If enabled, ModMan will fetch mod data for any mod with a missing
            addoninfo.txt online. ModMan will cache online-fetched data to make
            as few calls as possible
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>cLOSE</Button>
      </DialogActions>
    </Dialog>
  );
}
