import { Mod } from "@/constants/interfaces";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface ModEntryProps extends Mod {}
export default function ModCard(props: any) {
  const [enabled, setEnabled] = useState(false);
  const isCorrupt = props?.error;

  function handleModEnabled() {
    setEnabled((old) => !old);
  }

  const bgcolor = enabled ? "rgba(0,255,0,0.05)" : "rgba(255,0,0,0.05)";
  const corruptcolor = isCorrupt ? "rgba(14,14,14.22)" : "transparent";

  function openModInBrowser() {
    window.open("https://google.com", "_blank");
  }

  return (
    <Box pb={0}>
      <Box
        flex={1}
        textAlign={"left"}
        display={"grid"}
        flexDirection="column"
        gridTemplateColumns={"120px auto"}
        key={props.id}
        bgcolor={"rgba(52,52,52,0.3)"}
        borderRadius={1}
        overflow="hidden"
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
          p={2}
        >
          <Box>
            <Typography variant="h6">
              {props?.addontitle ?? `Corrupt addoninfo for ${props.id}`}
              <Box component={"span"} pl={1}></Box>
              <Typography variant="caption" fontSize={10}>
                {props?.addonauthor}
              </Typography>

              <Stack mt={1} spacing={1} direction="row">
                {props.categories.map((cat: string) => (
                  <Chip label={cat} size="small"></Chip>
                ))}
              </Stack>
            </Typography>
          </Box>

          {/*  <Box>
            <Button onClick={openModInBrowser} startIcon={<OpenInNewIcon />}>
              Workshop
            </Button>
          </Box> */}
        </Box>
      </Box>
    </Box>
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
