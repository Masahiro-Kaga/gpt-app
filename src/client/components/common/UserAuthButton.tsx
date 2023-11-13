import { Button } from "@mui/material";
import React from "react";

interface UserAuthButtonProps {
  userAction: () => void;
  typeOfButton: string;
}

const UserAuthButton: React.FC<UserAuthButtonProps> = ({
  userAction,
  typeOfButton,
}) => {
  return (
    <Button
      sx={{
        width: "100%",
        margin: "25px 0",
        alignSelf: "center",
        backgroundColor: "white",
        color: "black",
        "&:hover": { backgroundColor: "rgba(255,255,255,0.7)" },
        overflowWrap: 'break-word'
      }}
      variant="contained"
      disabled={false}
      onClick={userAction}
    >
      <span className="w-full">{typeOfButton}</span>
    </Button>
  );
};

export default UserAuthButton;
