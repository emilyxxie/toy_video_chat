import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';

export default withRouter(class AppWithRouterAccess extends Component {
  constructor(props) {
    super(props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
    this.props.history.push('/login');
  }

  render() {
    console.log(process.env.OKTA_ORG_URL);
    return (
        <Security issuer={`${process.env.OKTA_ORG_URL}/oauth2/default`}
                  clientId={process.env.OKTA_CLIENT_ID}
                  redirectUri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={this.onAuthRequired}
                  pkce={true} >
          <Route path='/' exact={true} component={Home} />
          <SecureRoute path='/protected' component={Protected} />
          <Route path='/login' render={() => <Login baseUrl= {process.env.OKTA_ORG_URL} />} />
          <Route path='/implicit/callback' component={LoginCallback} />
        </Security>
    );
  }
});