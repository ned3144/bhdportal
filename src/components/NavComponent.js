import React, { Component } from "react";
import {
  MDBNav,
  MDBTabPane,
  MDBTabContent,
  MDBNavItem,
  MDBNavLink,
  MDBIcon
} from "mdbreact";
import { RootUrl } from "./constants";
import Axios from "axios";

class NavComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      categories: [],
      isLoading: true,
        shouldGetCategoriesFromProps: props.shouldGetCategoriesFromProps
    };

    if(this.state.shouldGetCategoriesFromProps) {
        this.state.categories = props.categories;
        this.state.isLoading = false;
    } else {
        this.getCategories();
    }

  }

  toggleTab = activeTab => e => this.setState({ activeTab });

  getCategories = () => {
    const { page_ref } = this.props;

    Axios.get(`${RootUrl}/category`, { params: { page_ref } })
      .then(response => {
        this.setState({
          categories: response.data.categories,
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({ error: "Error fetching posts", isLoading: false });
      });
  };

  render() {
    const { render } = this.props;
    const { categories, isLoading } = this.state;
    if (isLoading) {
      return <div>טוען</div>;
    }
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    const nav_items = categories.map(({ name, icon }, category_index) => {
      return (
        <MDBNavItem>
          <MDBNavLink
            to="#"
            className={
              this.state.activeTab === `${category_index + 1}` ? "active" : ""
            }
            onClick={this.toggleTab(`${category_index + 1}`)}
            role="tab"
          >
            <div style={{ fontSize: "24px" }}>
              {icon && <MDBIcon icon={icon} className="mb-2 ml-2" />} {name}
            </div>
          </MDBNavLink>
        </MDBNavItem>
      );
    });
    const nav_contents = categories.map(({ _id }, index) => (
      <MDBTabPane tabId={`${parseInt(index) + 1}`} role="tabpanel" style={{marginBottom: "unset"}}>
        {" "}
        {render(_id)}
      </MDBTabPane>
    ));

    return (
      <React.Fragment>
        <div className="classic-tabs text-center" style={{direction: "rtl"}}>
          <MDBNav
            classicTabs
            className="nav-justified upper-navigation"
            style={{boxShadow: "unset"}}
          >
            {nav_items}
          </MDBNav>
          <MDBTabContent
            className="card"
            activeItem={this.state.activeTab}
            className="text-center inner-nav-tab-pane"
          style={{padding: "unset", margin: "unset" }}>
            {nav_contents}
          </MDBTabContent>
        </div>
      </React.Fragment>
    );
  }
}

export default NavComponent;
