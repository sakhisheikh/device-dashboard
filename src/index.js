import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import App from './App';

// Redux Store Configuration
import store from './store';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
});

function render(Component) {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
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
