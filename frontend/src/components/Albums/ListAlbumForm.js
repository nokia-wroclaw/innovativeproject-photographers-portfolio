import React, { useState } from "react";

import { Container } from "reactstrap";
import { IconContext } from "react-icons";
import { IoIosAdd } from "react-icons/io";

const ListAlbumForm = React.memo((props) => {
  const [name, setName] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddAlbum({ name: name })
  };
  return (
    <Container className="add-element" fluid>
      <h1 className="texth">Please enter name:</h1>
      <span className="p-2"></span>
      <form id="to-do-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <span className="p-2"></span>
        <button type="submit" className="buttonLightPink lightTheme">
          <IconContext.Provider value={{ size: "2em", color: "whitesmoke" }}>
            <IoIosAdd />
          </IconContext.Provider>
        </button>
      </form>
      <p></p>
    </Container>
  );
});

export default ListAlbumForm;
