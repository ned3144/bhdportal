import React, { Component } from "react";
import { MDBRow, MDBCol, MDBCard } from "mdbreact";
import Document from "./Document.js";
import NavComponent from "../NavComponent";
import HeaderImage from "../HeaderImage.js";
import { DocumentsRef } from "../constants";

const Documents = ({ documents }) => {
  const documentsList = documents.map(document => {
    return (
      <React.Fragment>
        <MDBCol
          className="mt-4"
          style={{ maxWidth: "15rem", minWidth: "15rem" }}
        >
          <Document {...document} />
        </MDBCol>{" "}
      </React.Fragment>
    );
  });
  return (
    <MDBCard>
      <MDBRow center>{documentsList}</MDBRow>
    </MDBCard>
  );
};

class DocumentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <HeaderImage
          imageLink="https://mdbootstrap.com/img/Photos/Slides/img%20(136).jpg"
          title="טפסים נפוצים"
        />

        <NavComponent
          page_ref={DocumentsRef}
          render={category_id => <Documents category_id={category_id} />}
        />
      </React.Fragment>
    );
  }
}
export default DocumentsPage;
