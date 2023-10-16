import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

interface ServiceButtonProps {
  to: string;
  title: string;
  backgroundColor: string;
  disabled: boolean;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({
  to,
  title,
  backgroundColor,
  disabled,
}) => {
  return (
    <Button
      component={Link}
      to={to}
      variant="contained"
      sx={{
        fontSize: "1rem",
        backgroundColor: { backgroundColor },
        "&:hover": {
          color: "black",
          backgroundColor: "white",
        },
        marginRight: "10px",
        marginLeft: "10px",
        border: disabled ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',}}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default ServiceButton;
