import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  appBar: { backgroundColor: '#1976d2 !important' },
  toolbar: { display: 'flex', justifyContent: 'center', gap: 20 },
  button: { color: '#fff !important' },
});

export const Navbar: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Button component={Link} to="/pais" className={classes.button}>
          Jogar Por País
        </Button>
        <Button component={Link} to="/personalizado" className={classes.button}>
          Cadastrar Times Personalizados
        </Button>
        <Button component={Link} to="/listagem" className={classes.button}>
          Times Criados
        </Button>
      </Toolbar>
    </AppBar>
  );
};
