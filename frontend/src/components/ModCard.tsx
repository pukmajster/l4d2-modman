import { Mod } from "@/constants/interfaces";
import { Preset } from "@/state/profile";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { Box, Button, Chip, Collapse, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface ModEntryProps extends Mod {
  preset: Preset;
  setPreset: (preset: Preset) => void;
}

export default function ModCard(props: ModEntryProps) {
  const [enabled, setEnabled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const isCorrupt = props?.error;

  function handleModEnabled() {
    setEnabled((old) => !old);
  }

  const bgcolor = enabled ? "rgba(0,255,0,0.05)" : "rgba(255,0,0,0.05)";
  const corruptcolor = isCorrupt ? "rgba(14,14,14.22)" : "transparent";

  function openModInBrowser(steamid: string) {
    window.open(
      `https://steamcommunity.com/sharedfiles/filedetails/?id=${steamid}`,
      "_blank"
    );
  }

  // -----------------------------------------

  const isEnabled = props.preset?.enabledMods?.includes(props.id) ?? false;

  function toggleModEnable() {
    const tempPreset = JSON.parse(JSON.stringify(props.preset));

    if (!Object.hasOwn(tempPreset, "enabledMods")) {
      tempPreset.enabledMods = [];
    }

    if (tempPreset.enabledMods.includes(props.id)) {
      console.log("DISABLED MOD");
      tempPreset.enabledMods = tempPreset.enabledMods.filter(
        (test: string) => test != props.id
      );
    } else {
      console.log("ENABLING MOD");
      tempPreset.enabledMods.push(props.id);
    }

    console.log(tempPreset.enabledMods);

    props.setPreset(tempPreset);
  }

  return (
    <Stack pb={0} sx={{ contentVisibility: "auto" }}>
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
          gridTemplateColumns: { xs: "1fr", md: "minmax(148px, 15%) auto" },
          transition: "background-color 0.14s ease",
          "&:hover": {
            bgcolor: "rgba(52,52,52,0.5)",
          },
        }}
      >
        <Box
          width="100%"
          //style={{ aspectRatio: "4/3" }}
          onClick={() => handleModEnabled()}
          position={"relative"}
          // borderLeft={`4px solid ${enabled ? "rgb(0,255,0)" : "rgb(255,0,0)"}`}
        >
          <img
            style={{ aspectRatio: "4/3", height: "100%", width: "100%" }}
            //src={`file:///home/kry/.local/share/Steam/steamapps/common/Left 4 Dead 2/left4dead2/addons/workshop/${props.id}.jpg`}
            src="https://images.gamebanana.com/img/ico/sprays/588400de9d258.png"
          ></img>

          <Box
            component={"button"}
            position={"absolute"}
            top={0}
            bottom={0}
            width="100%"
            bgcolor={enabled ? "rgba(0,255,0,0.05)" : "rgba(255,0,0,0.05)"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
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
              bgcolor={enabled ? "rgba(0,255,0,0.15)" : "rgba(255,0,0,0.15)"}
            >
              {enabled ? <CheckIcon /> : <CloseIcon />}
            </Box>
          </Box>
        </Box>

        <Box
          flex={1}
          width="100%"
          display={"flex"}
          justifyContent="space-between"
          p={1.5}
          pb={1}
        >
          <Stack justifyContent={"space-between"}>
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
                  <Chip label={cat} size="small"></Chip>
                ))}
              </Box>
            </Stack>
            <Stack mt={1} direction="row" spacing={1}>
              <Button
                onClick={() => openModInBrowser(props.id)}
                startIcon={<OpenInBrowserIcon />}
              >
                view in Workshop
              </Button>

              <Button
                onClick={() => setExpanded((old) => !old)}
                startIcon={<OpenInBrowserIcon />}
              >
                details
              </Button>
            </Stack>
          </Stack>

          {/* <Stack>
            <Checkbox
              onClick={() => toggleModEnable()}
              checked={isEnabled}
              color={isEnabled ? "primary" : "default"}
            ></Checkbox>
          </Stack> */}
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Box bgcolor={"#191919"} p={2} borderTop="1px solid #101010">
          <Box display={"grid"} gap={1} gridTemplateColumns="200px 1fr">
            <Typography>Description</Typography>
            <div>{props.addondescription}</div>
            <Typography>Tagline</Typography>
            <div>{props.addontagline}</div>
            <Typography>Version</Typography>
            <div>v{props.addonversion}</div>
            <Typography>Files</Typography>
            <Typography fontSize={12}>
              {props.files.map((f: string) => (
                <div>{f}</div>
              ))}
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Stack>
  );
}
