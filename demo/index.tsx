import * as React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from '../src/components/MUITheme';
import { GraphQLVoyager } from '../src';
// import LogoIcon from './icons/logo-small.png';

// import { IntrospectionModal } from './IntrospectionModal';
import { defaultPreset } from './presets';

import './components.css';

export default class Demo extends React.Component {
  state = {
    introspection: defaultPreset,
  };

  constructor(props) {
    super(props);

    const { url, withCredentials } = getQueryParams();
    if (url) {
      this.state.introspection = (introspectionQuery) =>
        fetch(url, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: introspectionQuery }),
          ...(withCredentials === 'true'
            ? { credentials: 'include', mode: 'cors' }
            : {}),
        }).then((response) => response.json());
    }
  }

  public render() {
    const introspection = this.state.introspection;
    return (
      <MuiThemeProvider theme={theme}>
        <GraphQLVoyager introspection={introspection}>
          <GraphQLVoyager.PanelHeader>
            <div className="voyager-panel">
              <Logo />
            </div>
          </GraphQLVoyager.PanelHeader>
        </GraphQLVoyager>
      </MuiThemeProvider>
    );
  }
}

function getQueryParams(): { [key: string]: string } {
  const query = window.location.search.substring(1);
  const params = {};

  for (const param of query.split('&')) {
    const [key, value] = param.split('=');
    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
  }
  return params;
}

class Logo extends React.Component {
  render() {
    return (
      <div className="voyager-logo">
        <a href="https://unicourt.com" target="_blank">
          <div className="logo">
             <img src="./icons/logo.png" alt="UniCourt" width="40%" height="50%" />
            <h2 className="title">
              <strong>API</strong>
            </h2>
          </div>
        </a>
      </div>
    );
  }
}

render(<Demo />, document.getElementById('root'));
