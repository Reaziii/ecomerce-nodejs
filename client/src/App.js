import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Snackbar, Alert } from '@mui/material';
import { closeSnakbar } from './redux/snakbar/snakbarAction';

const App = ({ children }) => {
  const snakbar = useSelector(state => state.snakbar);
  const dispatch = useDispatch();
  return (
    <>
      <Snackbar
        open={snakbar.show}
        onClose={() => dispatch(closeSnakbar())}
        autoHideDuration={4000}
      >
        <Alert severity={snakbar?.type}>{snakbar?.message}</Alert>
      </Snackbar>
      {children}
    </>
  )
}

export default App