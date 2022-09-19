import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";

export default function Header() {
  return (
    <Box p={1} borderBottom="1px solid #323232">
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={1} direction="row">
          <Button>SETTING</Button>
          <Button>build cache</Button>
          <Button>refresh cache</Button>
        </Stack>

        <Button variant="contained">preset</Button>
      </Stack>
    </Box>
  );
}
