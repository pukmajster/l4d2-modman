import { Mod } from "@/constants/interfaces";
import {
  filterGrenadeAtom,
  filterGunAtom,
  filterInfectedAtom,
  filterMeleeAtom,
  filterMiscAtom,
  filterSurvivorAtom,
  filterUtilsAtom,
  searchTermAtom,
} from "@/state/library";
import { cache } from "@/temp/workshop";
import { Box, Stack } from "@mui/material";
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

  return (
    <Box p={2} height="100%" overflow="scroll">
      <Stack
        //display={"grid"}
        //gridTemplateColumns="repeat( auto-fit, minmax(250px, 1fr) )"
        mr={3}
        spacing={2}
      >
        {Object.keys(cache).map((keyName: string, i) => {
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
            if (thisMod.categories?.includes(grenadeFilter)) matchingFilters++;
            if (thisMod.categories?.includes(survivorFilter)) matchingFilters++;
            if (thisMod.categories?.includes(infectedFilter)) matchingFilters++;
            if (thisMod.categories?.includes(utilsFilter)) matchingFilters++;

            if (matchingFilters == 0) return;
          }

          return <ModCard {...cache[keyName]} />;
        })}
      </Stack>

      <Box height={32}></Box>
    </Box>
  );
}
