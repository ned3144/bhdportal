import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Admin_ABGuidance from "./Admin_ABGuidance";
import Admin_Advanced from "./Admin_Advanced";
import Admin_Documents from "./Admin_Documents";
import Admin_Gallery from "./Admin_Gallery";
import Admin_Branches from "./Admin_Branches";
import Admin_Homepage from "./Admin_Homepage";
import Admin_Products from "./Admin_Products";
import AdminSideNavBar from "./AdminSideNavBar";

class Admin extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <AdminSideNavBar location={this.props.location} />
        <Switch>
          <Route exact path="/admin/homepage" component={Admin_Homepage} />
          <Route exact path="/admin/products" component={Admin_Products} />
          <Route exact path="/admin/ab_guidance" component={Admin_ABGuidance} />
          <Route exact path="/admin/documents" component={Admin_Documents} />
          <Route exact path="/admin/gallery" component={Admin_Gallery} />
          <Route exact path="/admin/branches" component={Admin_Branches} />
          <Route exact path="/admin/advanced" component={Admin_Advanced} />
          <Route
            path="/admin*"
            component={() => <Redirect to="/admin/homepage" />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Admin;
