import React, { Component } from "react";
import Songs from "./Songs";

export default class SingleAlbum extends Component {
  componentDidMount() {
    this.props.selectAlbum(this.props.id);
  }

  render() {
    if (Object.keys(this.props.album).length) {
      return (
        <div className="album">
          <div>
            <h3>{this.props.album.name}</h3>
            <img
              src={`/api/albums/${this.props.album.id}/image`}
              className="img-thumbnail"
            />
          </div>
          <Songs
            songs={this.props.album.songs}
            start={this.props.start}
            selectedSong={this.props.selectedSong}
          />
        </div>
      );
    } else {
      return <h1>Cargando</h1>;
    }
  }
}
