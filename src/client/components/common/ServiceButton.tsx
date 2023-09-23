import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

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
      }}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default ServiceButton;
