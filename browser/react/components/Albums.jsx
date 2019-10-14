import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Albums extends Component {
  render() {
    console.log("props:    " + JSON.stringify(this.props));
    return (
      <div className="albums">
        <h3>Albums</h3>
        <div className="row">
          {this.props.albums.map(album => (
            <div key={album.id} className="col-xs-4">
              <Link className="thumbnail" to={`/albums/${album.id}`}>
                <img src={album.imageUrl} />
                <div className="caption">
                  <h5>
                    <span>{album.name}</span>
                  </h5>
                  <small>{album.songs.length} songs</small>
                </div>
              </Link>
              {/* <a  href="#" onClick={() => selectAlbum(album.id)}>
           
          </a> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
