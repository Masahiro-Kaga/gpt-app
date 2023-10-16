import * as React from "react";

import {
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Item } from "src/client/types";

interface SettingDrawerProps {
  children: React.ReactNode;
  items: Item[];
}

const SettingDrawer: React.FC<SettingDrawerProps> = ({ children, items }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
        {children}
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300, padding: 2 }} role="presentation">
          <List>
            {items.map((item) => (
              <ListItem
                key={item.title}
                disablePadding
                sx={{ marginBottom: 2 }}
              >
                <ListItemIcon sx={{ mt: 0, mb: "auto" }}>
                  {item.icon}
                </ListItemIcon>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Box sx={{ mt: 2 }}>{item.component}</Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SettingDrawer;
