import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Card, CardActions, CardContent, Fab, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, Switch, TextField, Typography } from '@mui/material';
import { AppStyles } from './AppStyles';
import { ContentCopy, Refresh, SmartToy } from '@mui/icons-material';
import { Chance } from 'chance';
import { useTextInput } from './hooks/UseTextInput';
import { TextInputControl } from './components/TextInputControl';
import { useCheckedInput } from './components/CheckedInputControl';

const chance = new Chance();

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

function getRandom(min: number, max: number, isFloating = false) {

  if (Number.isNaN(min)) return 0;
  if (Number.isNaN(max)) return 0;
  if (min > max) return 0;

  if( isFloating ) {
    return chance.floating({
      min: Math.round(min),
      max: Math.round(max),
      fixed: 2,
    }); 
  }

  return chance.integer({
    min: Math.round(min),
    max: Math.round(max)
  });
}

function App() {

  // snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  let minimum = useMinimumInput();
  let maximum = useMaximumInput();
  let isFloat = useCheckedInput({ init: false });

  let [random, setRandom] = useState(getRandom(+minimum.value, +maximum.value, isFloat.checked));

  useEffect(() => {
    // empty brackets for second argument will cause to only run on mount
    setSnackbarOpen(true);
    setSnackbarMessage(`Welcome!`);
  }, []); // <= only run onece

  useEffect(() => {
    // So that random can instantly refresh when min / max edited or floating changed
    setRandom(getRandom(+minimum.value, +maximum.value, isFloat.checked));
  }, [minimum.value, maximum.value, isFloat.checked])

  const handleRefresh = useCallback((event) => {
    setRandom(getRandom(+minimum.value, +maximum.value, isFloat.checked));
  }, [minimum.value, maximum.value, isFloat.checked]);

  const handleCopy = useCallback((event) => {
    navigator.clipboard.writeText(`${random}`).then(function () {
      /* clipboard successfully set */
      setSnackbarOpen(true);
      setSnackbarMessage(`Copied '${random}' to clipboard`);
    }, function () {
      /* clipboard write failed */
      setSnackbarOpen(true);
      setSnackbarMessage(`Error: could not copy to clipboard`);
    });
  }, [random]);

  const handleMouseDownRandom = (event: any) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        autoHideDuration={6000}
      />
      <Card style={AppStyles.cardStyle}>
        <CardContent>
          <SmartToy style={AppStyles.logoStyle} fontSize="large" />
          <Typography gutterBottom variant="h5" component="h2">
            Random Number Generator
          </Typography>
        </CardContent>
        <CardContent>
          {/* custom control */}
          <TextInputControl
            style={{ margin: '10px', width: '40%' }}
            textInput={minimum}
          />
          <FormControl style={{ margin: '10px', width: '40%' }} >
            <TextField
              {...maximum}
            />
          </FormControl>

          <FormControl
            style={{ margin: '10px', width: '40%' }}
          >
            <FormControlLabel
              labelPlacement="top"
              label='floating point'
              control={
                <Switch
                  color="primary"
                  {...isFloat}
                />
              }
            />
            <FormHelperText style={{ textAlign: 'center' }}>{'floating point'}</FormHelperText>
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} style={{ marginTop: '30px', margin: '10px', width: '40%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Random Number</InputLabel>
            <OutlinedInput
              id="outlined-adornment-random"
              type='text'
              value={random}
              label='Random number'
              inputProps={
                { readOnly: true, }
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy to clipboard"
                    onClick={handleCopy}
                    onMouseDown={handleMouseDownRandom}
                    edge="end"
                  >
                    <ContentCopy />
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>Copy to clipboard</FormHelperText>
          </FormControl>
        </CardContent>
        <CardActions style={AppStyles.childActionsStyle}>
          <Fab
            color="primary"
            size="large"
            aria-label="refresh"
            onClick={handleRefresh}
          >
            <Refresh />
          </Fab>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default App;