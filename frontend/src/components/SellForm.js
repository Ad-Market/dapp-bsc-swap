import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Identicon from 'identicon.js';
import {
  AppBar,
  Toolbar,
  Typography,
  Input,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  TextField,
  FormControl,
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  IconButton,
  MenuItem
} from '@material-ui/core';
import EthSvg from './bnb.svg';
import TokenSvg from './token.svg';
import CachedIcon from '@material-ui/icons/Cached';

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
  input: {
    backgroundColor: 'white'
  },
  img: {
    width: '3em',
    height: 'auto',
  }
}));

const SellForm = ({
  ethBalance,
  tokenBalance,
  values,
  handleChange,
  handleSwitchForm,
  sellTokens
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6} style={{ textAlign: 'left' }}>
          <Typography noWrap>
            <strong>Input</strong>
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Typography noWrap>
            {`Balance: ${tokenBalance ? window.web3.utils.fromWei(tokenBalance.toString(), 'Ether') : 0}`}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'left' }}>
          <FormControl className={classes.margin} style={{ width: "100%" }}>
            <OutlinedInput
              id="outlined-basic"
              variant="outlined"
              className={classes.input}
              value={values.output}
              onChange={handleChange('output')}
              endAdornment={
                <InputAdornment position="start">
                  <img src={TokenSvg} className={classes.img} />
                  {`TBIM`}
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <IconButton
            onClick={() => handleSwitchForm()}
          >
            <CachedIcon fontSize="large" color="primary" />
          </IconButton>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'left' }}>
          <Typography noWrap>
            <strong>Output</strong>
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Typography noWrap>
            {`Balance: ${ethBalance ? window.web3.utils.fromWei(ethBalance, 'Ether') : 0}`}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'left' }}>
          <FormControl className={classes.margin} style={{ width: "100%" }}>
            <OutlinedInput
              disabled
              id="outlined-basic"
              variant="outlined"
              className={classes.input}
              value={values.input}
              onChange={handleChange('input')}
              endAdornment={
                <InputAdornment position="start">
                  <img src={EthSvg} className={classes.img} />
                  {`BNB`}
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'left' }}>
          <Typography noWrap>
            Exchange Rate
        </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Typography noWrap>
            {`1 BNB: 100 TBIM`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
            onClick={() => {
              let tokenAmount = values.input.toString();
              let etherAmount = values.output.toString();
              tokenAmount = window.web3.utils.toWei(tokenAmount, 'Ether');
              etherAmount = window.web3.utils.toWei(etherAmount, 'Ether');
              console.log('ETHER AMOUNT', etherAmount)
              console.log('TOKEN AMOUNT', tokenAmount)
              sellTokens(tokenAmount);
            }}
          >
            Swap
        </Button>
        </Grid>
      </Grid>
    </>
  )
};

export default SellForm;
