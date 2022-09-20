import { Mod } from "@/constants/interfaces";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { Box, Button, Chip, Collapse, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface ModEntryProps extends Mod {}

export default function ModCard(props: Mod) {
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

  return (
    <Stack pb={0} sx={{ contentVisibility: "auto" }}>
      <Box
        flex={1}
        textAlign={"left"}
        display={"grid"}
        flexDirection="column"
        gridTemplateColumns={"minmax(196px, 20%) auto"}
        key={props.id}
        bgcolor={"rgba(52,52,52,0.3)"}
        borderRadius={1}
        overflow="hidden"
        sx={{
          gridTemplateColumns: { xs: "1fr", md: "minmax(196px, 15%) auto" },
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
            src="https://steamuserimages-a.akamaihd.net/ugc/1821165190736623795/D89770A30E46A1DEADC0D182C7B29752ED4A6CC9/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
          ></img>

          <ModThumbnailOverlay enabled={enabled} />
        </Box>

        <Box
          flex={1}
          width="100%"
          display={"flex"}
          justifyContent="space-between"
          p={1.5}
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
                {props?.categories.map((cat: string) => (
                  <Chip label={cat} size="small"></Chip>
                ))}
              </Box>
            </Stack>
            <Stack mt={1} direction="row">
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

          {/*  <Box>
            
          </Box> */}
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

interface ModThumbnailOverlay {
  enabled: boolean;
}

const ModThumbnailOverlay = ({ enabled }: ModThumbnailOverlay) => {
  return (
    <Box
      position={"absolute"}
      top={0}
      bottom={0}
      width="100%"
      style={{ aspectRatio: "4/3" }}
      bgcolor={enabled ? "rgba(0,255,0,0.05)" : "rgba(255,0,0,0.05)"}
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
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
  );
};
