import categories from "@/constants/categories";
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
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useRecoilState } from "recoil";
import SettingsDialog from "./SettingsDialog";

export default function Sidebar() {
  const [survivorFilter, setSurvivorFilter] =
    useRecoilState(filterSurvivorAtom);
  const [infectedFilter, setInfectedFilter] =
    useRecoilState(filterInfectedAtom);
  const [grenadeFilter, setGrenadeFilter] = useRecoilState(filterGrenadeAtom);
  const [meleeFilter, setMeleeFilter] = useRecoilState(filterMeleeAtom);
  const [gunFilter, setGunFilter] = useRecoilState(filterGunAtom);
  const [miscFilter, setMiscFilter] = useRecoilState(filterMiscAtom);
  const [utilsFilter, setUtilsFilter] = useRecoilState(filterUtilsAtom);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);

  function clearFilters() {
    setSearchTerm("");
    setSurvivorFilter("");
    setInfectedFilter("");
    setGunFilter("");
    setMeleeFilter("");
    setGrenadeFilter("");
    setMiscFilter("");
    setUtilsFilter("");
  }

  function openWorkshop() {
    window.open(`https://steamcommunity.com/app/550/workshop/`, "_blank");
  }

  return (
    <Box p={2} height="100%" overflow="scroll">
      <Stack justifyContent={"space-between"} height="100%">
        <Stack spacing={2}>
          <TextField
            label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ width: 16 }} />
                </InputAdornment>
              ),
            }}
          ></TextField>

          <TextField
            label="Gun"
            select
            value={gunFilter}
            onChange={(e) => setGunFilter(e.target.value)}
          >
            <MenuItem value="">-</MenuItem>
            {categories.guns.map((entry) => (
              <MenuItem key={entry} value={entry}>
                {entry}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Melee"
            select
            value={meleeFilter}
            onChange={(e) => setMeleeFilter(e.target.value)}
          >
            <MenuItem value="">-</MenuItem>
            {categories.melee.map((entry) => (
              <MenuItem key={entry} value={entry}>
                {entry}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Grenades"
            select
            value={grenadeFilter}
            onChange={(e) => setGrenadeFilter(e.target.value)}
          >
            <MenuItem value="">-</MenuItem>
            {categories.grenades.map((entry) => (
              <MenuItem key={entry} value={entry}>
                {entry}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Survivor"
            select
            value={survivorFilter}
            onChange={(e) => setSurvivorFilter(e.target.value)}
          >
            <MenuItem value="">-</MenuItem>
            {categories.survivors.map((entry) => (
              <MenuItem key={entry} value={entry}>
                {entry}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Infected"
            select
            value={infectedFilter}
            onChange={(e) => setInfectedFilter(e.target.value)}
          >
            <MenuItem value="">-</MenuItem>
            {categories.infected.map((entry) => (
              <MenuItem key={entry} value={entry}>
                {entry}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Utils"
            select
            value={utilsFilter}
            onChange={(e) => setUtilsFilter(e.target.value)}
          >
            <MenuItem value="">-</MenuItem>
            {categories.utils.map((entry) => (
              <MenuItem key={entry} value={entry}>
                {entry}
              </MenuItem>
            ))}
          </TextField>

          <Button onClick={clearFilters}>Clear all filters</Button>

          <SettingsDialog />
        </Stack>

        <div>
          <Button
            onClick={() => openWorkshop()}
            startIcon={<OpenInBrowserIcon />}
          >
            Open Workshop
          </Button>
        </div>
      </Stack>
    </Box>
  );
}
