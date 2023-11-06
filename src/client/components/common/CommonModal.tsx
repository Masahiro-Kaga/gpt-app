import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

interface ModalProps {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
  }
  
const CommonModal: React.FC<ModalProps> = ({ open, title, message, onClose }) => {
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
      <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        maxWidth: "90%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" variant="body1">
          {message}
        </Typography>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CommonModal;
