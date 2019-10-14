import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Albums from "../components/Albums";
import Artists from "../components/Artists";
import SingleAlbum from "../components/SingleAlbum";
import audio from "../audio";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      selectedAlbum: {},
      selectedSong: {},
      isPlaying: false,
      currentSongList: [],
      progress: 0
    };
    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
    this.start = this.start.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/albums")
      .then(res => res.data)
      .then(serverAlbums => this.setState({ albums: serverAlbums }));
    audio.addEventListener("ended", () => {
      this.next();
    });
    audio.addEventListener("timeupdate", () => {
      this.setState({
        progress: (100 * audio.currentTime) / audio.duration
      });
    });
  }

  selectAlbum(albumId) {
    axios
      .get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(serverAlbum => this.setState({ selectedAlbum: serverAlbum }));
  }

  deselectAlbum() {
    this.setState({ selectedAlbum: {} });
  }

  start(song, songs) {
    this.setState({ selectedSong: song, currentSongList: songs });
    this.loadSong(song.audioUrl);
  }

  loadSong(audioUrl) {
    audio.src = audioUrl;
    audio.load();
    this.play();
  }

  play() {
    audio.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    audio.pause();
    this.setState({ isPlaying: false });
  }

  findSongIndex() {
    return this.state.currentSongList.findIndex(
      song => song.id === this.state.selectedSong.id
    );
  }

  next() {
    let index = this.findSongIndex() + 1;
    if (index >= this.state.currentSongList.length) {
      index = 0;
    }
    const song = this.state.currentSongList[index];
    this.setState({ selectedSong: song });
    this.loadSong(song.audioUrl);
  }

  previous() {
    let index = this.findSongIndex() - 1;
    if (index < 0) {
      index = this.state.currentSongList.length - 1;
    }
    const song = this.state.currentSongLists[index];
    this.setState({ selectedSong: song });
    this.loadSong(song.audioUrl);
  }

  render() {
    const {
      albums,
      selectedAlbum,
      selectedSong,
      isPlaying,
      progress
    } = this.state;
    return (
      <div id="main" className="container-fluid">
        <Sidebar />
        <div className="col-xs-10">
          <Switch>
            <Route
              exact
              path="/albums"
              render={() => <Albums albums={this.state.albums} />}
            />
            <Route exact path="/artists" render={() => <Artists />} />

            <Route
              path="/albums/:id"
              render={props => {
                console.log(props.match.params.id);
                return (
                  <SingleAlbum
                    selectedSong={selectedSong}
                    start={this.start}
                    album={selectedAlbum}
                    albums={this.albums}
                    id={props.match.params.id}
                    selectAlbum={this.selectAlbum}
                  />
                );
              }}
            />
            <Redirect from="/" to="/albums" />
          </Switch>

          {/* {!selectedAlbum.id ? (
            <Albums albums={albums} selectAlbum={this.selectAlbum} />
          ) : (
            <SingleAlbum
              selectedSong={selectedSong}
              start={this.start}
              album={selectedAlbum}
            />
          )} */}
        </div>
        <Footer
          selectedSong={selectedSong}
          isPlaying={isPlaying}
          play={this.play}
          pause={this.pause}
          next={this.next}
          previous={this.previous}
          progress={progress}
        />
      </div>
    );
  }
}

{
  /* <Sidebar deselectAlbum={this.deselectAlbum} />
        <div className="col-xs-10">
          {!selectedAlbum.id ? (
            <Route path="/albums">
              <Albums albums={albums} selectAlbum={this.selectAlbum} />
            </Route>
          ) : (
            <Route path="/albums/:id">
              <SingleAlbum
                selectedSong={selectedSong}
                start={this.start}
                album={selectedAlbum}
              />
            </Route> */
}
