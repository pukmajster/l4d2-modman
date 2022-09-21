import useConfigProperty from "@/hooks/useConfigProperty";
import { gameDirAtom } from "@/state/config";
import { TextField } from "@mui/material";

export default function SettingsDialog() {
  const [gameDir, setGameDir] = useConfigProperty("gameDir", gameDirAtom);

  return (
    <TextField
      value={gameDir}
      onChange={(e) => setGameDir(e.target.value)}
    ></TextField>
  );
}
