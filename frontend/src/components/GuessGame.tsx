import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

interface GuessGameProps {
  initialTeams: { name: string; country: string, clubColors?: string }[];
}

const useStyles = makeStyles({
  container: {
    padding: 20,
    maxWidth: 600,
    margin: '0 auto',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  listContainer: {
    marginTop: 20,
  },
  correctGuess: {
    color: 'green',
  },
  wrongGuess: {
    color: 'red',
  },
  visibleTeam: {
    fontStyle: 'italic',
  },
  button: {
    height: 40,
  },
  hintText: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#555',
  },
});

export const GuessGame: React.FC<GuessGameProps> = ({ initialTeams }) => {
  const classes = useStyles();
  const [hiddenTeams, setHiddenTeams] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [numToHide, setNumToHide] = useState<number>(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const startGame = () => {
    if (numToHide < 1 || numToHide > 20) {
      alert('Escolha um número entre 1 e 20');
      return;
    }
    const shuffled = [...initialTeams].sort(() => 0.5 - Math.random());
    const toHide = shuffled.slice(0, numToHide).map((t) => t.name.toLowerCase());
    setHiddenTeams(toHide);
    setGuesses([]);
    setInput('');
    setGameStarted(true);
    setShowHint(false);
  };

  const handleGuess = () => {
    const normalized = input.trim().toLowerCase();
    if (!normalized) {
      setInput('');
      return;
    }

    if (guesses.includes(normalized)) {
      setInput('');
      return;
    }

    const match = hiddenTeams.find((full) => full.includes(normalized));

    if (match) {
      setGuesses((prev) => [...prev, match]);
    } else {
      setGuesses((prev) => [...prev, normalized]);
    }

    setInput('');
  };

  const guessedCorrectly = guesses.filter((g) => hiddenTeams.includes(g));
  const guessedWrongly = guesses.filter((g) => !hiddenTeams.includes(g));
  const allGuessed = guessedCorrectly.length === hiddenTeams.length;

  return (
    <Box className={classes.container}>
      {!gameStarted ? (
        <>
          <Typography variant="h5" gutterBottom>
            Escolha quantos times ocultar (máx. 20)
          </Typography>
          <Box className={classes.inputRow}>
            <TextField
              type="number"
              label="Nº de times"
              value={numToHide}
              onChange={(e) => setNumToHide(Number(e.target.value))}
              inputProps={{ min: 1, max: 20 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={startGame}
              className={classes.button}
            >
              Iniciar jogo
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Adivinhe os {hiddenTeams.length} times ocultos
          </Typography>
          <Box className={classes.inputRow}>
            <TextField
              variant="outlined"
              placeholder="Digite o nome de um time"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleGuess}
              className={classes.button}
            >
              Enviar palpite
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowHint(true)}
              className={classes.button}
            >
              Mostrar dica
            </Button>
          </Box>

          {showHint && hiddenTeams.length > 0 && (
            <Typography className={classes.hintText}>
              💡 Dica: o primeiro time oculto está em “
              {
                initialTeams.find(
                  (t) => t.name.toLowerCase() === hiddenTeams[0]
                )?.clubColors
              }”.
            </Typography>
          )}

          <Typography variant="h6">Times visíveis:</Typography>
          <List dense className={classes.listContainer}>
            {initialTeams
              .filter((t) => !hiddenTeams.includes(t.name.toLowerCase()))
              .map((team) => (
                <ListItem key={team.name} className={classes.visibleTeam}>
                  {team.name} ({team.country}) ({team.clubColors})
                </ListItem>
              ))}
          </List>

          <Typography variant="h6">
            Acertos ({guessedCorrectly.length}/{hiddenTeams.length}):
          </Typography>
          <List dense className={classes.listContainer}>
            {guessedCorrectly.map((name, i) => (
              <ListItem key={i} className={classes.correctGuess}>
                {name}
              </ListItem>
            ))}
          </List>

          <Typography variant="h6">Erros:</Typography>
          <List dense className={classes.listContainer}>
            {guessedWrongly.map((name, i) => (
              <ListItem key={i} className={classes.wrongGuess}>
                {name}
              </ListItem>
            ))}
          </List>

          <Dialog
            open={allGuessed}
            disableEscapeKeyDown
            aria-labelledby="dialog-title"
          >
            <DialogTitle id="dialog-title" color="success.main">
              🎉 Parabéns! 🎉
            </DialogTitle>
            <DialogContent dividers>
              <Typography>
                Você encontrou todos os times ocultos!
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  // reinicia o jogo: limpa tudo e fecha a modal
                  setGameStarted(false);
                  setGuesses([]);
                  setHiddenTeams([]);
                }}
              >
                Jogar Novamente
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};
