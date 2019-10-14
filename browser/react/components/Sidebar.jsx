import React from "react";
import { Link } from "react-router-dom";

export default ({ deselectAlbum }) => (
  <div className="col-xs-2">
    <section className="sidebar">
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <section>
            <Link to="/albums">Go to Albums</Link>
            <Link to="/artists">ARTISTS</Link>
          </section>
          {/* <a onClick={deselectAlbum} href="#">ALBUMS</a> */}
        </h4>
      </section>
    </section>
  </div>
);
