import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardContent,
  Button,

} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BuyForm from './BuyForm';
import SellForm from './SellForm';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '600px',
    // backgroundColor: 'lightgray'
  },
  margin: {
    padding: '1em'
  },
  img: {
    width: '2em',
    height: 'auto',
  }
}));

const currencies = [
  {
    value: 'ETH',
    label: 'ETH',
  },
  {
    value: 'TBIM',
    label: 'TBIM',
  }
];

const Main = ({
  content,
  ethBalance,
  tokenBalance,
  buyTokens,
  sellTokens
}) => {
  const classes = useStyles();
  const [currentForm, setCurrentForm] = useState('buy');
  const [currency, setCurrency] = useState('ETH');
  const [values, setValues] = useState({
    input: '0',
    output: '0'
  });

  const handleSwitchForm = () => {
    if (currentForm === 'buy') {
      setCurrentForm('sell');
    } else {
      setCurrentForm('buy');
    }
  }

  const handleBuyChange = (prop) => (event) => {
    const newValues = { ...values, [prop]: event.target.value };
    const amount = event.target.value * 100;
    const updatedValues = {
      ...newValues,
      input: event.target.value.toString(),
      output: amount.toString()
    }
    setValues(updatedValues);
  };

  const handleSellChange = (prop) => (event) => {
    const newValues = { ...values, [prop]: event.target.value };
    const amount = event.target.value / 100;
    const updatedValues = {
      ...newValues,
      input: amount.toString(),
      output: event.target.value.toString(),
    }
    setValues(updatedValues);
  };

  // const handleChange = (event) => {
  //   setCurrency(event.target.value);
  // };


  return (
    <Grid container spacing={3}>
      <Grid item xs={2} sm={3} md={4} />
      <Grid item xs={8} sm={6} md={4} >
        <Card className={classes.card} elevation={5}>
          <CardContent>
            {currentForm === 'buy' &&
              <BuyForm
                ethBalance={ethBalance}
                tokenBalance={tokenBalance}
                values={values}
                handleChange={handleBuyChange}
                handleSwitchForm={handleSwitchForm}
                buyTokens={buyTokens}
              />
            }
            {currentForm === 'sell' &&
              <SellForm
                ethBalance={ethBalance}
                tokenBalance={tokenBalance}
                values={values}
                handleChange={handleSellChange}
                handleSwitchForm={handleSwitchForm}
                sellTokens={sellTokens}
              />
            }
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2} sm={3} md={4} />
    </Grid>
  )
};

export default Main;