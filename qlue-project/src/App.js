import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 10,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <div >
        <Map style={{height: "600px", width: "100%", border: "1px solid black"}} center={position} zoom={13}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
      </div>
    );
  }
}

export default App;
