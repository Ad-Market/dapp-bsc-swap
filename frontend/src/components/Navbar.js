import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Identicon from 'identicon.js';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid
} from '@material-ui/core';
import TokenSvg from './token.svg';

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  img: {
    width: '3em',
    height: 'auto',
  }
}));

const Navbar = ({
  account
}) => {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar)}
    >
      <Grid container>
        <Grid xs={9} style={{ textAlign: 'left' }}>
          <Toolbar>
            <Typography noWrap>
              <img src={TokenSvg} className={classes.img} />
              {`DApp BSC-Token Swap`}
            </Typography>
          </Toolbar>
        </Grid>
        <Grid xs={3} style={{ textAlign: 'right' }}>
          <Toolbar>
            {account &&
              <>
                <img
                  width='30'
                  height='30'
                  src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                />
                <Typography noWrap>
                  {`${account}`}
                </Typography>
              </>
            }
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  )
};

export default Navbar;
