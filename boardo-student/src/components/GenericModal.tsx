import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";

export default function GenericModal({
  open,
  title,
  dialogActions,
  closeModal,
  children,
}: {
  open: boolean;
  title: string;
  dialogActions?: JSX.Element;
  closeModal: () => void;
  children: JSX.Element;
}) {
  const theme = useTheme();
  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: theme.palette.grey[50],
          },
        }}
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
        <Divider/>
        <DialogContent  dividers>{children}</DialogContent>
        {dialogActions && <DialogActions>{dialogActions}</DialogActions>}
      </Dialog>
    </>
  );
}
