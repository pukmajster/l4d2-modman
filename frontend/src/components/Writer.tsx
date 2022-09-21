import { writeAddons } from "@/functions/writeAddonsList";
import useSelectedPreset from "@/hooks/useSelectedPreset";
import { cache } from "@/temp/workshop";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

export default function Writer() {
  const [writingState, setWritingState] = useState("");
  const [preset, setPreset] = useSelectedPreset();

  async function write() {
    try {
      setWritingState("Working on it...");
      await writeAddons(cache, preset);
      setWritingState("Done!");
    } catch {
      setWritingState("Something went wrong...");
    }
  }

  return (
    <>
      <Button onClick={write} startIcon={<FileUploadIcon />}>
        Use these mods
      </Button>
      <Typography></Typography>
    </>
  );
}
