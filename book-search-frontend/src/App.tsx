import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import BookSearchPage from './components/BookSearchPage';
import styled from 'styled-components';
import { Layout, Button } from 'antd';
import bkImage from './assets/bk.png';

const Header = styled(Layout.Header)`
  background: transparent;
  padding: 2rem;
  height: 8rem;
`;
const Content = styled(Layout.Content)`
  margin: 3rem 2rem;
  padding: 0 3rem;
`;
const NavBar = styled(Button.Group)`
  float: right;
`;
const NavItem = styled(Button)`
  font-size: 1rem;
  padding: 0 1rem;
  margin: 0 1rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 4px;
  &:hover {
    color: #fff;
    border-bottom: 2px solid #999;
  }
  &:focus {
    color: #fff;
    border-bottom: 2px solid #999;
  }
`;
const Container = styled(Layout)`
  min-height: 100vh;
  background: #000 url(${bkImage}) center center no-repeat fixed;
`;

const AppContainer: React.FC = () => (
  <Container>
    <Header>
      <NavBar>
        {/* <NavItem type="link">Search</NavItem> */}
        {/* <NavItem type="link">Login</NavItem> */}
      </NavBar>
    </Header>
    <Content>
      <BrowserRouter>
        <Switch>
          <Route path="/search" component={BookSearchPage} />
          <Redirect to="/search" />
        </Switch>
      </BrowserRouter>
    </Content>
  </Container>
);

export default AppContainer;
