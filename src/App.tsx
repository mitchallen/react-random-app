import React, { useCallback, useState } from 'react';
import './App.css';
import { Card, CardActions, CardContent, Fab, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { AppStyles } from './AppStyles';
import { Refresh, SmartToy } from '@mui/icons-material';
import { Chance } from 'chance';

const chance = new Chance();

interface TextInput {
  id?: string,
  name?: string,
  label?: string,
  helperText?: string,
  init?: string,
}

function useTextInput(options: TextInput = {}) {
  let {
    id = undefined,
    name = undefined,
    label = 'Text',
    helperText = 'Enter text',
    init = '',
  } = options;

  if (name === undefined) {
    name = id;
  }

  const [value, setValue] = useState(init);
  const handleValueChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return {
    id,
    name,
    label,
    value,
    onChange: handleValueChange,
    helperText,
  }
}

function useMinimumInput() {
  return useTextInput({
    init: '0',
    label: 'Minimum',
    helperText: 'Enter minimum'
  });
}

function useMaximumInput() {
  return useTextInput({
    init: '100',
    label: 'Maximum',
    helperText: 'Enter maximum'
  });
}

function getRandom(min: number, max: number) {

  if (Number.isNaN(min)) return 0;
  if (Number.isNaN(max)) return 0;
  if (min > max) return 0;

  return chance.integer({
    min: Math.round(min),
    max: Math.round(max)
  });
}

function App() {

  let minimum = useMinimumInput();
  let maximum = useMaximumInput();

  let [random, setRandom] = useState(0);

  // this will generate a new value every time min or max is changed:
  random = getRandom(+minimum.value, +maximum.value);

  const handleRefresh = useCallback((event) => {
      setRandom(getRandom(+minimum.value, +maximum.value));
  }, [minimum, maximum])

  return (
    <Card style={AppStyles.cardStyle}>
      <CardContent>
        <SmartToy style={AppStyles.logoStyle} fontSize="large" />
        <Typography gutterBottom variant="h5" component="h2">
          Random Number Generator
        </Typography>
      </CardContent>
      <CardContent>
        <FormControl style={{ margin: '10px', width: '40%' }} >
          <TextField
            {...minimum}
          />
        </FormControl>
        <FormControl style={{ margin: '10px', width: '40%' }} >
          <TextField
            {...maximum}
          />
        </FormControl>
        <FormControl style={{ margin: '10px', width: '100%' }} >
          <Typography gutterBottom variant="h5" component="h2">
            {random}
          </Typography>
        </FormControl>
      </CardContent>
      <CardActions style={AppStyles.childActionsStyle}>
        <Fab
          color="primary"
          aria-label="refresh"
          onClick={handleRefresh}
        >
          <Refresh />
        </Fab>
      </CardActions>
    </Card>
  );
}

export default App;