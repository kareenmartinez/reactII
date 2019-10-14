import React, { Component } from "react";

export default class Artists extends Component {
  constructor() {
    super();
    this.state = {
      artists: [],
      selectedArtist: {}
    };
  }

  render() {
    return (
      <div>
        <h3>Artists</h3>
        <div className="list-group">
          {this.state.artists.map(artist => {
            return (
              <div className="list-group-item" key={artist.id}>
                {/* Determinaremos donde linkear luego */}
                <Link to="">{artist.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
