import categories from "@/constants/categories";
import {
  filterFiletypeAtom,
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
  Divider,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useRecoilState } from "recoil";

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
  const [filetypeFilter, setFiletypeFilter] =
    useRecoilState(filterFiletypeAtom);
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
    setFiletypeFilter("");
  }

  function openWorkshop() {
    window.externalApi.openLinkInBrowser(
      `https://steamcommunity.com/app/550/workshop/`
    );
  }

  return (
    <Box
      p={2}
      height="100%"
      sx={{
        overflowY: "hidden",
      }}
    >
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
            label="File Type"
            select
            value={filetypeFilter}
            onChange={(e) => setFiletypeFilter(e.target.value)}
          >
            <MenuItem value="">- NONE -</MenuItem>
            {categories.filetypes.map((entry) => (
              <MenuItem key={entry} value={entry}>
                {entry}
              </MenuItem>
            ))}
          </TextField>

          <Divider />

          <TextField
            label="Gun"
            select
            value={gunFilter}
            onChange={(e) => setGunFilter(e.target.value)}
          >
            <MenuItem value="">- NONE -</MenuItem>
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
            <MenuItem value="">- NONE -</MenuItem>
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
            <MenuItem value="">- NONE -</MenuItem>
            {categories.grenades.map((entry) => (
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
            <MenuItem value="">- NONE -</MenuItem>
            {categories.utils.map((entry) => (
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
            <MenuItem value="">- NONE -</MenuItem>
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
            <MenuItem value="">- NONE -</MenuItem>
            {categories.infected.map((entry) => (
              <MenuItem key={entry} value={entry}>
                {entry}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Misc"
            select
            value={miscFilter}
            onChange={(e) => setMiscFilter(e.target.value)}
          >
            <MenuItem value="">- NONE -</MenuItem>
            {categories.misc.map((entry) => (
              <MenuItem key={entry} value={entry}>
                {entry}
              </MenuItem>
            ))}
          </TextField>

          <Button onClick={clearFilters}>Clear all filters</Button>
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
