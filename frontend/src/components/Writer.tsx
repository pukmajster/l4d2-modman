import { writeAddons } from "@/functions/writeAddonsList";
import useConfigProperty from "@/hooks/useConfigProperty";
import useSelectedPreset from "@/hooks/useSelectedPreset";
import { gameDirAtom } from "@/state/config";
import { cache } from "@/temp/workshop";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms, null));
}

export default function Writer() {
  const [writingState, setWritingState] = useState("");
  const [gameDir] = useConfigProperty("gameDir", gameDirAtom);
  const [preset, setPreset] = useSelectedPreset();

  async function write() {
    try {
      setWritingState("Working on it...");
      await wait(200);
      await writeAddons(cache, preset, gameDir);
      setWritingState("Done!");
      await wait(1000);
      setWritingState("");
    } catch {
      setWritingState("Something went wrong...");
    }
  }

  return (
    <>
      <Button onClick={write} startIcon={<FileUploadIcon />}>
        Use these mods
      </Button>
      <Typography>{writingState}</Typography>
    </>
  );
}
