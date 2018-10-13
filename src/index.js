import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  }
});

function render(Component) {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root'),
  );
}

render(App);

// if (module.hot) {
//     module.hot.accept('./App', () => {
//         const NextApp = require('./App').default;
//         render(NextApp);
//     });
// }
