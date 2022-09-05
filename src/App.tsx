import './App.css';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import RoutesWrapper from './routes';
import TopAppBar from './components/pageLayout/AppBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopAppBar />
      <Container maxWidth={false}>
        <RoutesWrapper />
      </Container>
    </ThemeProvider>
  );
}

export default App;

