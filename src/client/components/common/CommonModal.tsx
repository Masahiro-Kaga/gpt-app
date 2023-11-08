import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

interface ModalProps {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
    noButton?: boolean;
    linkedIn?: boolean;
  }
  
const CommonModal: React.FC<ModalProps> = ({ open, title, message, onClose, noButton, linkedIn }) => {
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
        borderRadius: 3,
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
        {/* // if no button is specified, do not show the button */}
        {!noButton && (
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        )}
        {linkedIn && (
          <Button variant="contained" color="primary" onClick={() => { window.open('https://www.linkedin.com/in/masahiro-kaga-ab8604192/', '_blank') }}>
            LinkedIn
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default CommonModal;
