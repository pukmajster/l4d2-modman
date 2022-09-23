import { Mod } from "@/constants/interfaces";
import useConfigProperty from "@/hooks/useConfigProperty";
import useSelectedPreset from "@/hooks/useSelectedPreset";
import { cacheAtom } from "@/state/cache";
import { gameDirAtom } from "@/state/config";
import {
  filterFiletypeAtom,
  filterGrenadeAtom,
  filterGunAtom,
  filterInfectedAtom,
  filterMeleeAtom,
  filterMiscAtom,
  filterSurvivorAtom,
  filterUtilsAtom,
  maxRowsAtom,
  searchTermAtom,
  selectedModIdsAtom,
} from "@/state/library";
import {
  Box,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import ModCard from "./ModCard";

type SortingType = "name_asc" | "name_desc";
type TypeOfMod = "any" | "enabled" | "disabled" | "conflicting";

export default function ModLibrary() {
  const [cache] = useRecoilState(cacheAtom);
  const [preset, setPreset] = useSelectedPreset();
  const [selectedMods, setSelectedMods] = useRecoilState(selectedModIdsAtom);
  const [gameDir] = useConfigProperty("gameDir", gameDirAtom);

  // -----------------------------------------------------------------------
  //  Search, filters, ...
  // -----------------------------------------------------------------------

  const [survivorFilter, setSurvivorFilter] =
    useRecoilState(filterSurvivorAtom);
  const [infectedFilter, setInfectedFilter] =
    useRecoilState(filterInfectedAtom);
  const [filetypeFilter, setFiletypeFilter] =
    useRecoilState(filterFiletypeAtom);
  const [grenadeFilter, setGrenadeFilter] = useRecoilState(filterGrenadeAtom);
  const [meleeFilter, setMeleeFilter] = useRecoilState(filterMeleeAtom);
  const [gunFilter, setGunFilter] = useRecoilState(filterGunAtom);
  const [miscFilter, setMiscFilter] = useRecoilState(filterUtilsAtom);
  const [utilsFilter, setUtisFilter] = useRecoilState(filterMiscAtom);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);
  const [sortingType, setSortingType] = useState<SortingType>("name_asc");
  const [showOnlyTypeOfMod, setShowOnlyTypeOfMods] = useState<TypeOfMod>("any");

  const [conflictingMods, setConfictingMods] = useState<string[]>([]);

  const [maxRows, setMaxRows] = useRecoilState(maxRowsAtom);

  const filteredAndSortedMods = useMemo(() => {
    //if (!cache || !preset || !preset?.enabledMods) return [];

    let tempStorage: Mod[] = [];
    let i = 0;

    Object.keys(cache).map((keyName: string) => {
      if (i > (maxRows ?? 0)) {
        return;
      }

      let modName = cache[keyName]?.addontitle;
      let thisMod = cache[keyName] as Mod;

      // Check for mod type
      switch (showOnlyTypeOfMod) {
        case "any":
          break;
        case "enabled":
          if (!preset.enabledMods.includes(thisMod.id)) return;
          break;
        case "disabled":
          if (preset.enabledMods.includes(thisMod.id)) return;
          break;
        case "conflicting":
          if (!conflictingMods.includes(thisMod.id)) return;
          break;
      }

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
        miscFilter ||
        filetypeFilter
      ) {
        let matchingFilters = 0;
        if (thisMod.categories?.includes(gunFilter)) matchingFilters++;
        if (thisMod.categories?.includes(meleeFilter)) matchingFilters++;
        if (thisMod.categories?.includes(miscFilter)) matchingFilters++;
        if (thisMod.categories?.includes(grenadeFilter)) matchingFilters++;
        if (thisMod.categories?.includes(survivorFilter)) matchingFilters++;
        if (thisMod.categories?.includes(infectedFilter)) matchingFilters++;
        if (thisMod.categories?.includes(utilsFilter)) matchingFilters++;
        if (thisMod.categories?.includes(filetypeFilter)) matchingFilters++;

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
    filetypeFilter,
    sortingType,
    showOnlyTypeOfMod,
    searchTerm,
    maxRows,
  ]);

  // -----------------------------------------------------------------------
  //  Conflicting mods
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!preset || !cache || !preset?.enabledMods) return;

    let enabledMods = preset.enabledMods;
    let collectiveListOfFiles: string[] = [];
    let tempConflictingMods: string[] = [];
    let isThisModConflicting = false;

    let occurencesOfFiles: {
      [key: string]: number;
    } = {};

    for (let key in cache) {
      if (enabledMods.includes(key)) {
        let mod = cache[key];
        collectiveListOfFiles = collectiveListOfFiles.concat(mod.files);
      }
    }

    for (let file of collectiveListOfFiles) {
      if (occurencesOfFiles[file]) {
        occurencesOfFiles[file] += 1;
      } else {
        occurencesOfFiles[file] = 1;
      }
    }

    for (let key in cache) {
      isThisModConflicting = false;

      if (enabledMods.includes(key)) {
        let mod = cache[key];
        for (let file of mod.files) {
          if (occurencesOfFiles[file] > 1) isThisModConflicting = true;
        }

        if (isThisModConflicting) {
          tempConflictingMods.push(mod.id);
        }
      }
    }

    setConfictingMods(tempConflictingMods);
    console.log(occurencesOfFiles);

    console.log(collectiveListOfFiles);
  }, [preset, cache]);

  // -----------------------------------------------------------------------
  //  Render
  // -----------------------------------------------------------------------

  if (!preset || !cache) {
    return (
      <>
        <Stack alignContent={"center"} height="100%" alignItems={"center"}>
          <CircularProgress />
        </Stack>
      </>
    );
  }

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

          <Stack spacing={2} mx={2}>
            {conflictingMods.length > 0 && (
              <Typography color={"firebrick"}>
                Mods conflicting: {conflictingMods.length}
              </Typography>
            )}
          </Stack>

          <Stack minWidth={"200px"} pr={1} alignItems="center">
            <TextField
              label="Number of mods to show"
              fullWidth
              select
              value={maxRows}
              onChange={(e) => setMaxRows(+e.target.value)}
            >
              <MenuItem value="30">30</MenuItem>
              <MenuItem value="50">50</MenuItem>
              <MenuItem value="100">100</MenuItem>
              <MenuItem value="300">300</MenuItem>
              <MenuItem value="999">All</MenuItem>
            </TextField>
          </Stack>

          <Stack minWidth={"200px"} pr={1} alignItems="center">
            <TextField
              label="Type of mod to show"
              fullWidth
              select
              value={showOnlyTypeOfMod}
              onChange={(e) =>
                setShowOnlyTypeOfMods(e.target.value as TypeOfMod)
              }
            >
              <MenuItem value="any">Any</MenuItem>
              <MenuItem value="enabled">Enabled</MenuItem>
              <MenuItem value="disabled">Dsabled</MenuItem>
              <MenuItem value="conflicting">Conflicting</MenuItem>
            </TextField>
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
        <Stack mr={3} spacing={2}>
          {filteredAndSortedMods.map((mod) => (
            <ModCard
              {...mod}
              key={mod.id}
              preset={preset}
              setPreset={setPreset}
              gameDir={gameDir}
              isConflicting={conflictingMods.includes(mod.id)}
            />
          ))}
        </Stack>

        <Box height={32}></Box>
      </Box>
    </Box>
  );
}
