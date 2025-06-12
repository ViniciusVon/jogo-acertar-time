import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { GuessGame } from '../components/GuessGame';

interface Team {
  id: number;
  name: string;
  country: string;
}

const useStyles = makeStyles({
  container: { padding: 20, maxWidth: 600, margin: '40px auto' },
  header: { marginBottom: 20 },
  listItem: { borderBottom: '1px solid #ddd' },
  button: { marginTop: 20 },
});

export default function TeamListPage() {
  const classes = useStyles();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  // edição
  const [editOpen, setEditOpen] = useState(false);
  const [editTeam, setEditTeam] = useState<Team | null>(null);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  // remoção
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTeam, setDeleteTeam] = useState<Team | null>(null);

  const loadTeams = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Team[]>('/api/teams');
      setTeams(res.data);
    } catch {
      alert('Não foi possível carregar os times');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleEditClick = (team: Team) => {
    setEditTeam(team);
    setName(team.name);
    setCountry(team.country);
    setEditOpen(true);
  };
  const handleSave = async () => {
    if (!editTeam) return;
    try {
      await axios.put(`/api/teams/${editTeam.id}`, { name, country });
      setEditOpen(false);
      loadTeams();
    } catch {
      alert('Erro ao salvar edição');
    }
  };

  const handleDeleteClick = (team: Team) => {
    setDeleteTeam(team);
    setDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!deleteTeam) return;
    try {
      await axios.delete(`/api/teams/${deleteTeam.id}`);
      setDeleteOpen(false);
      loadTeams();
    } catch {
      alert('Erro ao remover time');
    }
  };

  return (
    <Box className={classes.container}>
      {!started ? (
        <>
          <Typography variant="h4" className={classes.header}>
            Listagem de Times
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <List>
                {teams.map((team) => (
                  <ListItem
                    key={team.id}
                    className={classes.listItem}
                    secondaryAction={
                      <>
                        <IconButton edge="end" onClick={() => handleEditClick(team)}>
                          <Edit />
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleDeleteClick(team)}>
                          <Delete />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary={team.name}
                      secondary={`País: ${team.country}`}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                className={classes.button}
                variant="contained"
                disabled={teams.length < 2}
                onClick={() => setStarted(true)}
              >
                Iniciar Jogo
              </Button>
            </>
          )}

          {/* Modal de edição */}
          <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
            <DialogTitle>Editar Time</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Nome do time"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="País"
                fullWidth
                variant="outlined"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
              <Button variant="contained" onClick={handleSave}>
                Salvar
              </Button>
            </DialogActions>
          </Dialog>

          {/* Diálogo de remoção */}
          <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
            <DialogTitle>Confirmar remoção</DialogTitle>
            <DialogContent>
              <Typography>
                Tem certeza que deseja remover o time <strong>{deleteTeam?.name}</strong>?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteOpen(false)}>Cancelar</Button>
              <Button color="error" variant="contained" onClick={handleConfirmDelete}>
                Remover
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <GuessGame initialTeams={teams.map(({ name, country }) => ({ name, country }))} />
      )}
    </Box>
  );
}
