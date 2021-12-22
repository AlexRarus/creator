import React from 'react';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AddLinkIcon from '@mui/icons-material/AddLink';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BorderHorizontalIcon from '@mui/icons-material/BorderHorizontal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BallotIcon from '@mui/icons-material/Ballot';

export const typeIconsMap = {
  avatar: <AccountCircleIcon />,
  text: <TextFieldsIcon />,
  link: <AddLinkIcon />,
  button: <SmartButtonIcon />,
  list: <ListAltIcon />,
  collapsed_list: <BallotIcon />,
  separator: <BorderHorizontalIcon />,
};
