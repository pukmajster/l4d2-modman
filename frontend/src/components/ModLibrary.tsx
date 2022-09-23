import { Mod } from "@/constants/interfaces";
import useConfigProperty from "@/hooks/useConfigProperty";
import useSelectedPreset from "@/hooks/useSelectedPreset";
import { cacheAtom } from "@/state/cache";
import { gameDirAtom } from "@/state/config";
import {
  filterGrenadeAtom,
  filterGunAtom,
  filterInfectedAtom,
  filterMeleeAtom,
  filterMiscAtom,
  filterSurvivorAtom,
  filterUtilsAtom,
  searchTermAtom,
  selectedModIdsAtom,
} from "@/state/library";
import {
  Box,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import ModCard from "./ModCard";

type SortingType = "name_asc" | "name_desc";

export default function ModLibrary() {
  const [survivorFilter, setSurvivorFilter] =
    useRecoilState(filterSurvivorAtom);
  const [infectedFilter, setInfectedFilter] =
    useRecoilState(filterInfectedAtom);
  const [grenadeFilter, setGrenadeFilter] = useRecoilState(filterGrenadeAtom);
  const [meleeFilter, setMeleeFilter] = useRecoilState(filterMeleeAtom);
  const [gunFilter, setGunFilter] = useRecoilState(filterGunAtom);
  const [miscFilter, setMiscFilter] = useRecoilState(filterUtilsAtom);
  const [utilsFilter, setUtisFilter] = useRecoilState(filterMiscAtom);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);
  const [sortingType, setSortingType] = useState<SortingType>("name_asc");

  const [cache] = useRecoilState(cacheAtom);
  const [preset, setPreset] = useSelectedPreset();
  const [selectedMods, setSelectedMods] = useRecoilState(selectedModIdsAtom);
  const [gameDir] = useConfigProperty("gameDir", gameDirAtom);

  const filteredAndSortedMods = useMemo(() => {
    let tempStorage: Mod[] = [];
    let i = 0;

    Object.keys(cache).map((keyName: string) => {
      if (i > 30) {
        return;
      }

      let modName = cache[keyName]?.addontitle;
      let thisMod = cache[keyName] as Mod;

      // Make sure the mod's title fits the search term
      if (searchTerm) {
        if (!modName) return;

        if (!modName.toLowerCase().includes(searchTerm.toLowerCase())) return;
      }

      if (
        gunFilter ||
        meleeFilter ||
        grenadeFilter ||
        survivorFilter ||
        infectedFilter ||
        utilsFilter ||
        miscFilter
      ) {
        let matchingFilters = 0;
        if (thisMod.categories?.includes(gunFilter)) matchingFilters++;
        if (thisMod.categories?.includes(meleeFilter)) matchingFilters++;
        if (thisMod.categories?.includes(miscFilter)) matchingFilters++;
        if (thisMod.categories?.includes(grenadeFilter)) matchingFilters++;
        if (thisMod.categories?.includes(survivorFilter)) matchingFilters++;
        if (thisMod.categories?.includes(infectedFilter)) matchingFilters++;
        if (thisMod.categories?.includes(utilsFilter)) matchingFilters++;

        if (matchingFilters == 0) return;
      }

      i++;

      tempStorage.push(thisMod);

      if (sortingType == "name_asc") {
        tempStorage = tempStorage.sort((a: Mod, b: Mod) =>
          (a?.addontitle ?? "").localeCompare(b.addontitle ?? "")
        );
      }

      if (sortingType == "name_desc") {
        tempStorage = tempStorage.sort((a: Mod, b: Mod) =>
          (b?.addontitle ?? "").localeCompare(a.addontitle ?? "")
        );
      }
    });
    console.log(tempStorage);

    return tempStorage;
  }, [
    cache,
    preset,
    gunFilter,
    meleeFilter,
    grenadeFilter,
    survivorFilter,
    infectedFilter,
    utilsFilter,
    miscFilter,
    sortingType,
    searchTerm,
  ]);

  if (!preset || !cache)
    return (
      <>
        <Stack alignContent={"center"} height="100%" alignItems={"center"}>
          <CircularProgress />
        </Stack>
      </>
    );

  return (
    <Box
      height="100%"
      overflow="hidden"
      display={"flex"}
      flexDirection="column"
    >
      <Stack
        direction="row"
        alignItems="center"
        bgcolor="#171717"
        borderRadius="8px"
        my={2}
        py={1}
        mr={3}
      >
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction={"row"} alignItems="center" flex={1}>
            {/* <Checkbox disabled></Checkbox>
            {selectedMods.length > 0 && (
              <Typography component="span">
                Selected: {selectedMods.length}
              </Typography>
            )} */}
          </Stack>

          <Stack minWidth={"200px"} pr={1} alignItems="center">
            <TextField
              label="Sorting"
              fullWidth
              select
              value={sortingType}
              onChange={(e) => setSortingType(e.target.value as SortingType)}
            >
              <MenuItem value="name_asc">Name (Ascending)</MenuItem>
              <MenuItem value="name_desc">Name (Descending)</MenuItem>
            </TextField>
          </Stack>
        </Stack>
      </Stack>

      <Box
        flex="1"
        sx={{
          overflowY: "scroll",
        }}
      >
        <Stack
          //display={"grid"}
          //gridTemplateColumns="repeat( auto-fit, minmax(250px, 1fr) )"
          mr={3}
          spacing={2}
        >
          {/* {Object.keys(cache).map((keyName: string) => {
            if (i > 30) {
              return;
            }

            let modName = cache[keyName]?.addontitle;
            let thisMod = cache[keyName] as Mod;

            // Make sure the mod's title fits the search term
            if (searchTerm) {
              if (!modName) return;

              if (!modName.toLowerCase().includes(searchTerm.toLowerCase()))
                return;
            }

            if (
              gunFilter ||
              meleeFilter ||
              grenadeFilter ||
              survivorFilter ||
              infectedFilter ||
              utilsFilter ||
              miscFilter
            ) {
              let matchingFilters = 0;
              if (thisMod.categories?.includes(gunFilter)) matchingFilters++;
              if (thisMod.categories?.includes(meleeFilter)) matchingFilters++;
              if (thisMod.categories?.includes(miscFilter)) matchingFilters++;
              if (thisMod.categories?.includes(grenadeFilter))
                matchingFilters++;
              if (thisMod.categories?.includes(survivorFilter))
                matchingFilters++;
              if (thisMod.categories?.includes(infectedFilter))
                matchingFilters++;
              if (thisMod.categories?.includes(utilsFilter)) matchingFilters++;

              if (matchingFilters == 0) return;
            }

            i++;

            return (
              <ModCard
                {...cache[keyName]}
                key={thisMod.id}
                preset={preset}
                setPreset={setPreset}
              />
            );
          })} */}

          {filteredAndSortedMods.map((mod) => (
            <ModCard
              {...mod}
              key={mod.id}
              preset={preset}
              setPreset={setPreset}
              gameDir={gameDir}
            />
          ))}
        </Stack>

        <Box height={32}></Box>
      </Box>
    </Box>
  );
}
