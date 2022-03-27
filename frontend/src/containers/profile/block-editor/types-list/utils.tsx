import React from 'react';
import { COLORS } from 'src/components/theme';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AddLinkIcon from '@mui/icons-material/AddLink';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BorderHorizontalIcon from '@mui/icons-material/BorderHorizontal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BallotIcon from '@mui/icons-material/Ballot';

export const typeIconsMap = {
  avatar: <AccountCircleIcon fontSize={'small'} />,
  text: <TextFieldsIcon fontSize={'small'} />,
  link: <AddLinkIcon fontSize={'small'} />,
  button: <SmartButtonIcon fontSize={'small'} />,
  list: <ListAltIcon fontSize={'small'} />,
  collapsed_list: <BallotIcon fontSize={'small'} />,
  separator: <BorderHorizontalIcon fontSize={'small'} />,
};

export const typeColors = {
  avatar: COLORS.green[500],
  button: COLORS.blue[500],
  collapsed_list: COLORS.pink[500],
  list: COLORS.purple[500],
  separator: COLORS.orange[500],
  text: COLORS.blue[300],
  undefined: COLORS.white,
};
