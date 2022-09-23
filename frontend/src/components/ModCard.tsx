import { Mod } from "@/constants/interfaces";
import { selectedModIdsAtom } from "@/state/library";
import { Preset } from "@/state/profile";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";

import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";

interface ModEntryProps extends Mod {
  preset: Preset;
  setPreset: (preset: Preset) => void;
  gameDir: string;
}

export default function ModCard(props: ModEntryProps) {
  const [expanded, setExpanded] = useState(false);
  const isEnabled = props.preset?.enabledMods?.includes(props.id) ?? false;
  const isCorrupt = props?.error;

  function openModInBrowser(steamid: string) {
    window.open(
      `https://steamcommunity.com/sharedfiles/filedetails/?id=${steamid}`,
      "_blank"
    );
  }

  console.log(props.gameDir);

  // -----------------------------------------

  function toggleModEnable() {
    const tempPreset = JSON.parse(JSON.stringify(props.preset));

    if (!Object.hasOwn(tempPreset, "enabledMods")) {
      tempPreset.enabledMods = [];
    }

    if (tempPreset.enabledMods.includes(props.id)) {
      tempPreset.enabledMods = tempPreset.enabledMods.filter(
        (test: string) => test != props.id
      );
    } else {
      tempPreset.enabledMods.push(props.id);
    }

    console.log(tempPreset.enabledMods);

    props.setPreset(tempPreset);
  }

  // -----------------------------------------

  const [selectedMods, setSelectedMods] = useRecoilState(selectedModIdsAtom);
  const isSelected = useMemo(
    () => selectedMods.includes(props.id),
    [selectedMods]
  );

  function handleSelectToggle() {
    if (selectedMods.includes(props.id))
      setSelectedMods((old) => [...old].filter((test) => test != props.id));
    else setSelectedMods((old) => [...old, props.id]);
  }

  // -----------------------------------------

  return (
    <Stack direction="row" overflow={"hidden"} width="100%">
      {/* <Stack justifyContent={"center"}>
        <Checkbox onClick={handleSelectToggle} checked={isSelected}></Checkbox>
      </Stack> */}
      <Box pb={0} flex={1} sx={{ contentVisibility: "visible" }}>
        <Box
          flex={1}
          textAlign={"left"}
          display={"grid"}
          flexDirection="column"
          gridTemplateColumns={"minmax(196px, 14%) auto"}
          key={props.id}
          bgcolor={"rgba(52,52,52,0.3)"}
          borderRadius={1}
          overflow="hidden"
          sx={{
            gridTemplateColumns: { xs: "1fr", md: "minmax(148px, 5%) auto" },
            transition: "background-color 0.14s ease",
            "&:hover": {
              bgcolor: "rgba(52,52,52,0.5)",
            },
          }}
        >
          <Box
            width="100%"
            //style={{ aspectRatio: "4/3" }}
            position={"relative"}
            // borderLeft={`4px solid ${enabled ? "rgb(0,255,0)" : "rgb(255,0,0)"}`}
          >
            <img
              style={{ aspectRatio: "4/3", height: "100%", width: "100%" }}
              //src={`file:///home/kry/.local/share/Steam/steamapps/common/Left 4 Dead 2/left4dead2/addons/workshop/${props.id}.jpg`}
              src={`file://${props.gameDir}/addons/workshop/${props.id}.jpg`}
              //src="https://images.gamebanana.com/img/ico/sprays/588400de9d258.png"
              //src={`file:///home/kry/Downloads/profileIcon_8fl44zptvck91.jpg`}
            ></img>

            <Box
              component={"button"}
              position={"absolute"}
              top={0}
              bottom={0}
              right={0}
              width="100%"
              bgcolor={isEnabled ? "rgba(0,255,0,0.1)" : "rgba(255,0,0,0.1)"}
              display="flex"
              p="5px"
              justifyContent={"end"}
              alignItems={"end"}
              onClick={() => toggleModEnable()}
              border="none"
              boxShadow="none"
              sx={{ cursor: "pointer" }}
            >
              <Box
                p={0.5}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius="50%"
                bgcolor={
                  isEnabled ? "rgba(0,255,0,0.35)" : "rgba(255,0,0,0.35)"
                }
              >
                {isEnabled ? <CheckIcon /> : <CloseIcon />}
              </Box>
            </Box>
          </Box>

          <Box flex={1} p={1.5} pb={1}>
            <Stack>
              <Stack>
                <Typography variant="h6">
                  {props?.addontitle ?? `Corrupt addoninfo for ${props.id}`}
                  <Box component={"span"} pl={1}></Box>
                  <Typography variant="caption" fontSize={10}>
                    {props?.addonauthor}
                  </Typography>
                </Typography>

                <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                  {props?.categories?.map((cat: string) => (
                    <Chip
                      sx={{ borderRadius: "2px" }}
                      label={cat}
                      size="small"
                    ></Chip>
                  ))}
                </Box>
              </Stack>
            </Stack>

            <Stack mt={1} direction="row" spacing={1}>
              <Button
                onClick={() => openModInBrowser(props.id)}
                startIcon={<OpenInBrowserIcon />}
              >
                view in Workshop
              </Button>

              {/* <Button
                onClick={() => setExpanded((old) => !old)}
                startIcon={<OpenInBrowserIcon />}
              >
                details
              </Button> */}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
