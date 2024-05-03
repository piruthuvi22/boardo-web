import { Drawer, useTheme } from "@mui/material";

export default function GenericDrawer({
  open,
  width = "40%",
  closeDrawer,
  children,
}: {
  open: boolean;
  width: string;
  closeDrawer: () => void;
  children: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <Drawer
      open={open}
      onClose={closeDrawer}
      anchor="right"
      variant="temporary"
      sx={{
        "& .MuiDrawer-paper": {
          width: width,
          height: "100%",
        },
      }}
    >
      {children}
    </Drawer>
  );
}
