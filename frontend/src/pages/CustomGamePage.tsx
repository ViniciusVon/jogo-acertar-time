import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: { padding: 20, maxWidth: 600, margin: '40px auto' },
  field: { marginBottom: 16 },
  list: { marginTop: 16 },
  inputRow: { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 },
  button: { marginRight: 8 },
});

const COUNTRIES = ['Brasil', 'Argentina', 'França', 'Espanha', 'Alemanha', 'Itália'];

export default function CustomGamePage() {
  const classes = useStyles();

  const [inputName, setInputName] = useState('');
  const [inputCountry, setInputCountry] = useState(COUNTRIES[0]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTeam = async () => {
    const name = inputName.trim();
    const country = inputCountry.trim();

    if (!name || !country) return;

    try {
        const checkResponse = await fetch(`/api/teams?name=${encodeURIComponent(name)}`);
        if (checkResponse.ok) {
        const existingTeams = await checkResponse.json();
        const exists = existingTeams.some((team: any) => team.name.toLowerCase() === name.toLowerCase());

        if (exists) {
            setErrorMessage('Esse time já está cadastrado.');
            setSuccessMessage('');
            return;
        }
        }

        const response = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, country }),
        });

        if (!response.ok) throw new Error('Erro ao salvar no banco');

        setInputName('');
        setInputCountry('');
        setSuccessMessage('Time adicionado com sucesso!');
        setErrorMessage('');
    } catch (error) {
        setErrorMessage('Erro ao salvar o time.');
        setSuccessMessage('');
    }
  };


  return (
    <Box className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Cadastrar Times
      </Typography>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Box className={classes.inputRow}>
        <TextField
          label="Nome do time"
          variant="outlined"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          fullWidth
        />

        <FormControl variant="outlined" sx={{ minWidth: 140 }}>
          <InputLabel>País</InputLabel>
          <Select
            label="País"
            value={inputCountry}
            onChange={(e) => setInputCountry(e.target.value as string)}
          >
            {COUNTRIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button variant="contained" onClick={handleAddTeam}>
        Adicionar Time
      </Button>
    </Box>
  );
}
