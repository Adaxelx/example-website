import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './theme/GlobalStyle';
import { theme } from './theme/mainTheme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* ogarnąć te renderowanie tych rzeczy tak jak na stronie tamtej */

import Home from './templates/Home/Home';
import About from './templates/About/About';
import Gallery from './components/Gallery';

import img from './images/WWa/fontanna.jpg';

class App extends React.Component {
  data = [
    {
      title: 'Warszawa - Wisła',
      subtitle: 'Krótki wyjazd przed studiami',
      mainImg: img,
      images: [
        { src: img, description: 'Multimedialny park fontann' },
        { src: img, description: 'Multimedialny park fontann' },
      ],
      path: '/articles/WWa',
      date: '17-18.07.2019r.',
      nextArt: {
        title: 'Bialski zachód',
        subtitle: 'Spokojny dzień w domu',
        img: img,
        date: '19.07.2019r.',
        src: '/articles/BP',
      },
    },
    {
      title: 'Bialski zachód',
      subtitle: 'Spokojny dzień w domu',
      mainImg: img,
      images: [
        { src: img, description: 'Multimedialny park fontann' },
        { src: img, description: 'Multimedialny park fontann' },
      ],
      path: '/articles/BP',
      date: '22-23.07.2019r.',
      nextArt: {
        title: 'Warszawa - Wisła',
        subtitle: 'Krótki wyjazd przed studiami',
        img: img,
        date: '19.07.2019r.',
        src: '/articles/WWa',
      },
    },
  ];

  state = {
    loaded: false,
  };

  changeLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { loaded } = this.state;
    const { data, changeLoad } = this;
    const routes = data.map((art, i) => (
      <Route key={art.path} path={art.path} exact>
        {({ match }) => (
          <Gallery
            title={art.title}
            date={art.date}
            changeLoad={changeLoad}
            images={art.images}
            nextArt={art.nextArt}
            key={i}
            show={match !== null}
          />
        )}
      </Route>
    ));
    return (
      <ThemeProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL}>
          <GlobalStyle />
          <Switch>
            <Route path="/" exact>
              {({ match }) => <Home data={data} loaded={loaded} changeLoad={changeLoad} show={match !== null} />}
            </Route>
            <Route path="/about">{({ match }) => <About changeLoad={changeLoad} show={match !== null} />}</Route>
            {routes}
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
