import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function TopAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="inventory"
            sx={{ mr: 2 }}
          >
            <InventoryIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product management
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
