import { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { GuessGame } from '../components/GuessGame';

const useStyles = makeStyles({
  container: { padding: 20, maxWidth: 600, margin: '40px auto' },
  formRow: { display: 'flex', gap: 10, alignItems: 'center' },
});

const COMPETITIONS = [
  { country: 'Brasil', code: 'BSA' },
  { country: 'Alemanha', code: 'BL1' },
  { country: 'Argentina', code: 'ARG' },
  { country: 'França', code: 'FL1' },
  { country: 'Espanha', code: 'PD' },
  { country: 'Itália', code: 'SA' },
];

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export default function CountryGamePage() {
  const classes = useStyles();
  const [selected, setSelected] = useState(COMPETITIONS[0].code);
  const [teams, setTeams] = useState<{ name: string; country: string }[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadTeams = async () => {
    setLoaded(false);
    const comp = COMPETITIONS.find((c) => c.code === selected)!;
    try {
      const res = await axios.get(`/api/competitions/${comp.code}/teams`, {
        headers: { 'X-Auth-Token': API_TOKEN },
      });
      const list = res.data.teams.map((t: any) => ({
        name: t.name,
        country: comp.country,
      }));
      setTeams(list);
      setLoaded(true);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar times');
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const newCode = e.target.value;
    setSelected(newCode);
    setLoaded(false);
    setTeams([]);
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Jogo por País
      </Typography>
      <Box className={classes.formRow}>
        <FormControl fullWidth>
          <InputLabel>País / Liga</InputLabel>
          <Select
            value={selected}
            label="País / Liga"
            onChange={handleSelectChange}
          >
            {COMPETITIONS.map((c) => (
              <MenuItem key={c.code} value={c.code}>
                {c.country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={loadTeams}>
          Carregar Times
        </Button>
      </Box>

      {loaded && <GuessGame initialTeams={teams} />}
    </Box>
  );
}