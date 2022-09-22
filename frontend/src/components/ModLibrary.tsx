import { Mod } from "@/constants/interfaces";
import useSelectedPreset from "@/hooks/useSelectedPreset";
import { cacheAtom } from "@/state/cache";
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
  Checkbox,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import ModCard from "./ModCard";

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

  const [cache] = useRecoilState(cacheAtom);
  const [preset, setPreset] = useSelectedPreset();
  const [selectedMods, setSelectedMods] = useRecoilState(selectedModIdsAtom);

  if (!preset || !cache)
    return (
      <>
        <Stack alignContent={"center"} height="100%" alignItems={"center"}>
          <CircularProgress />
        </Stack>
      </>
    );

  let i = 0;

  return (
    <Box
      height="100%"
      overflow="scroll"
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
        <Checkbox disabled></Checkbox>
        {selectedMods.length > 0 && (
          <Typography>Selected: {selectedMods.length}</Typography>
        )}
      </Stack>

      <Box flex="1" overflow="scroll">
        <Stack
          //display={"grid"}
          //gridTemplateColumns="repeat( auto-fit, minmax(250px, 1fr) )"
          mr={3}
          spacing={2}
        >
          {Object.keys(cache).map((keyName: string) => {
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
          })}
        </Stack>

        <Box height={32}></Box>
      </Box>
    </Box>
  );
}
