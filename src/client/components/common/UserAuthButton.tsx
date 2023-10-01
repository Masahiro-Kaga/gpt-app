import { Button } from '@mui/material';
import React from 'react'

interface UserAuthButtonProps {
    // userAction: (event: React.MouseEvent<HTMLElement>) => void;
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
          width: "200px",
          margin: "25px 0",
          alignSelf: "center",
          backgroundColor: "white",
          color: "black",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.7)" },
        }}
        variant="contained"
        disabled={false}
        onClick={userAction}
      >
        {typeOfButton}
      </Button>
    );
  };
  
export default UserAuthButton