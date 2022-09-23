import useProfileProperty from "@/hooks/useProfileProperty";
import { showPresetsDialogAtom } from "@/state/dialogs";
import { profileAllPresetsAtom } from "@/state/profile";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

export default function Presets() {
  const [allPresets, setAllPresets] = useProfileProperty(
    "presets",
    profileAllPresetsAtom
  );
  const [showPresetsDialog, setShowPresetsDialog] = useRecoilState(
    showPresetsDialogAtom
  );

  function handleOnClose() {
    setShowPresetsDialog(false);
  }

  const presetsToDisplay = useMemo(() => {
    let presetNames = Object.keys(allPresets);
    return presetNames;
  }, [allPresets]);

  return (
    <Dialog open={showPresetsDialog} onClose={handleOnClose} fullWidth>
      <DialogTitle>Presets</DialogTitle>
      <DialogContent>
        <Stack>
          {presetsToDisplay.map((pr) => (
            <Stack direction={"row"}>{pr}</Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>cLOSE</Button>
      </DialogActions>
    </Dialog>
  );
}
