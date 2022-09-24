import { writeAddons } from "@/functions/writeAddonsList";
import useConfigProperty from "@/hooks/useConfigProperty";
import useSelectedPreset from "@/hooks/useSelectedPreset";
import { cacheAtom } from "@/state/cache";
import { gameDirAtom } from "@/state/config";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button } from "@mui/material";
import { useState } from "react";
import { useRecoilState } from "recoil";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms, null));
}

export default function Writer() {
  const [writingState, setWritingState] = useState("");
  const [gameDir] = useConfigProperty("gameDir", gameDirAtom);
  const [preset, setPreset] = useSelectedPreset();
  const [cache] = useRecoilState(cacheAtom);

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
        {writingState ? writingState : "Use these mods"}
      </Button>
    </>
  );
}
