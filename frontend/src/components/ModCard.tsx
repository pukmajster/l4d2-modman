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
  isConflicting: boolean;
}

export default function ModCard(props: ModEntryProps) {
  const isEnabled = props.preset?.enabledMods?.includes(props.id) ?? false;
  const [isShown, setIsShown] = useState(false);

  function openModInBrowser(steamid: string) {
    window.externalApi.openLinkInBrowser(
      `https://steamcommunity.com/sharedfiles/filedetails/?id=${steamid}`
    );
  }

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
    <Stack
      direction="column"
      width="100%"
      height={"auto"}
      alignSelf="stretch"
      bgcolor={"rgba(52,52,52,0.25)"}
      borderRadius={1}
      sx={{
        transition: "background-color 0.14s ease",
        "&:hover": {
          bgcolor: "rgba(52,52,52,0.5)",
        },
      }}
    >
      <Box
        pb={0}
        flex={1}
        textAlign={"left"}
        flexDirection="column"
        display={"flex"}
        sx={{
          "&:hover .modCard__extra": {
            visibility: "visible",
            backdropFilter: "blur(22px) saturate(2)",
          },
        }}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <Box
          flex={1}
          textAlign={"left"}
          flexDirection="column"
          //Wbgcolor={"rgba(52,52,52,0.25)"}
          borderRadius={1}
          display={"flex"}
          position="relative"
        >
          <Box width="100%" position={"relative"}>
            <img
              style={{
                aspectRatio: "5/3", // Don't judge
                height: "100%",
                width: "100%",
                opacity: isEnabled ? "1" : "0.5",
              }}
              src={`file://${props.gameDir}/addons/workshop/${props.id}.jpg`}
            ></img>

            <Box
              component={"button"}
              position={"absolute"}
              top={0}
              bottom={0}
              right={0}
              width="100%"
              bgcolor="transparent"
              display="flex"
              p="0"
              justifyContent={"end"}
              alignItems={"end"}
              onClick={() => toggleModEnable()}
              border="none"
              boxShadow="none"
              sx={{ cursor: "pointer" }}
            >
              <Box
                component={"button"}
                position={"absolute"}
                top={0}
                bottom={0}
                right={0}
                width="100%"
                bgcolor="transparent"
                display="flex"
                p="0"
                justifyContent={"end"}
                alignItems={"end"}
                onClick={() => toggleModEnable()}
                border="none"
                boxShadow="none"
                sx={{ cursor: "pointer" }}
              >
                {props.isConflicting && (
                  <Box
                    p={0.5}
                    width="100%"
                    sx={{
                      backdropFilter: "blur(5px)",
                      bgcolor: "rgba(182,0,0,0.4)",
                    }}
                  >
                    <Typography fontSize="9px">
                      THIS MOD IS CONFLICTING WITH ANOTHER MOD!
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          <Box
            px={1.4}
            left={0}
            right={0}
            width="100%"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            bgcolor={isEnabled ? "rgba(0,120,0,0.8)" : "rgba(120,120,120,0.8)"}
          >
            <Typography variant="caption" lineHeight={0}>
              {isEnabled ? "Enabled" : "Disabled"}
            </Typography>
            {isEnabled ? <CheckIcon /> : <CloseIcon />}
          </Box>

          {isShown && (
            <Box
              flex={1}
              justifyContent="space-between"
              display={"flex"}
              flexDirection="column"
              position={"absolute"}
              top="100%"
              left="0"
              right="0"
              zIndex={20}
              bgcolor={"rgba(0,0,0,0.55)"}
              visibility="hidden"
              className="modCard__extra"
              sx={
                {
                  // borderBottomLeftRadius: 5,
                  // borderBottomRightRadius: 5,
                }
              }
            >
              <Stack p={1.4}>
                <Stack direction={"column"}>
                  <Typography variant="caption">
                    {props?.addontitle ?? `${props.id}`}
                    <Box component={"span"} pl={1}></Box>
                  </Typography>

                  <Typography
                    variant="caption"
                    fontSize={10}
                    sx={{ opacity: 0.7 }}
                  >
                    {props?.addonauthor}
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
              <Stack
                p={1.4}
                pt={0}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Button
                  size="small"
                  onClick={() => openModInBrowser(props.id)}
                  startIcon={<OpenInBrowserIcon />}
                >
                  Workshop
                </Button>
              </Stack>
              {/* {props.isConflicting && (
            <Typography color="firebrick" fontSize="12px">
              THIS MOD IS CONFLICTING WITH ANOTHER MOD!
            </Typography>
          )} */}
            </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );

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
              style={{
                aspectRatio: "4/3",
                height: "100%",
                width: "100%",
                opacity: isEnabled ? "1" : "0.5",
              }}
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
              //bgcolor={isEnabled ? "rgba(0,255,0,0.01)" : "rgba(255,0,0,0.01)"}
              bgcolor="transparent"
              display="flex"
              //p="5px"
              p="0"
              justifyContent={"end"}
              alignItems={"end"}
              onClick={() => toggleModEnable()}
              border="none"
              boxShadow="none"
              sx={{ cursor: "pointer" }}
              // borderRight={`4px solid ${
              //   isEnabled ? "rgba(0,255,0,1)" : "rgba(255,0,0,1)"
              // }`}
            >
              <Box
                //p={0.5}
                px={1}
                width="100%"
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                //borderRadius="50%"
                bgcolor={isEnabled ? "rgba(0,120,0,0.7)" : "rgba(120,0,0,0.7)"}
                sx={{ backdropFilter: "blur(15px)" }}
              >
                {isEnabled ? "Enabled" : "Disabled"}
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

            <Stack mt={1} direction="row" spacing={1} alignItems="center">
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

              {props.isConflicting && (
                <Typography color="firebrick">
                  THIS MOD IS CONFLICTING WITH ANOTHER MOD!
                </Typography>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
