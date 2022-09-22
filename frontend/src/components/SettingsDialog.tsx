import useConfigProperty from "@/hooks/useConfigProperty";
import { gameDirAtom } from "@/state/config";
import { showModmanConfigDialogAtom } from "@/state/dialogs";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useRecoilState } from "recoil";

export default function SettingsDialog() {
  const [gameDir, setGameDir] = useConfigProperty("gameDir", gameDirAtom);
  const [open, setOpen] = useRecoilState(showModmanConfigDialogAtom);

  function handleOnClose() {
    setOpen(false);
  }

  async function handleNewDirectory() {
    let dir = await window.dialogApi.selectFolder();
    if (!dir) return;
    setGameDir(dir);
  }

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Stack>
          <TextField
            label="Game directory"
            value={gameDir}
            onChange={(e) => setGameDir(e.target.value)}
          ></TextField>
          <Stack direction="row" justifyContent={"end"}>
            <Button startIcon={<FolderIcon />} onClick={handleNewDirectory}>
              SELECT DIRECTROY
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>cLOSE</Button>
      </DialogActions>
    </Dialog>
  );
}
