import React, { Component } from 'react';
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

class App extends Component {
  constructor () {
    super()
    this.state = {
      position : [{"placemark_id":"83386","name":"TERMINAL BLOK M","address":"SULTAN HASANUDDIN JAKARTA SELATAN DKI JAKARTA","lat":"-6.243410","lng":"106.799767"},{"placemark_id":"83412","name":"TERMINAL BUS ANTAR KOTA KAMPUNG RAMBUTAN","address":"JENDERAL T.B. SIMATUPANG JAKARTA TIMUR DKI JAKARTA","lat":"-6.310530","lng":"106.883949"},{"placemark_id":"83424","name":"TERMINAL BUS CILILITAN","address":"MAYJEND SUTOYO; PGC CILILITAN JAKARTA TIMUR DKI JAKARTA","lat":"-6.262040","lng":"106.865517"},{"placemark_id":"83431","name":"TERMINAL BUS GROGOL","address":"KIAI TAPA JAKARTA BARAT DKI JAKARTA","lat":"-6.166380","lng":"106.791901"},{"placemark_id":"83437","name":"TERMINAL BUS KALIDERES","address":"DAAN MOGOT JAKARTA BARAT DKI JAKARTA","lat":"-6.154510","lng":"106.706039"},{"placemark_id":"83438","name":"TERMINAL BUS KAMPUNG MELAYU","address":"KAMPUNG MELAYU BESAR JAKARTA TIMUR DKI JAKARTA","lat":"-6.224440","lng":"106.866951"},{"placemark_id":"83439","name":"TERMINAL BUS KAMPUNG RAMBUTAN","address":"JENDERAL T.B. SIMATUPANG JAKARTA TIMUR DKI JAKARTA","lat":"-6.309330","lng":"106.882881"},{"placemark_id":"83441","name":"TERMINAL BUS KLENDER","address":"WIJAYA KUSUMA JAKARTA TIMUR DKI JAKARTA","lat":"-6.221350","lng":"106.932442"},{"placemark_id":"83446","name":"TERMINAL BUS LEBAK BULUS","address":"PASAR JUMAT JAKARTA SELATAN DKI JAKARTA","lat":"-6.290120","lng":"106.774544"},{"placemark_id":"83455","name":"TERMINAL BUS MANGGARAI","address":"SULTAN AGUNG JAKARTA SELATAN DKI JAKARTA","lat":"-6.209030","lng":"106.847481"},{"placemark_id":"83458","name":"TERMINAL BUS MUARA ANGKE","address":"PENDARATAN IKAN JAKARTA UTARA DKI JAKARTA","lat":"-6.108810","lng":"106.773041"},{"placemark_id":"83465","name":"TERMINAL BUS PASAR MINGGU","address":"PASAR MINGGU RAYA JAKARTA SELATAN DKI JAKARTA","lat":"-6.283210","lng":"106.843872"},{"placemark_id":"83470","name":"TERMINAL BUS PINANG RANTI","address":"PONDOK GEDE RAYA JAKARTA TIMUR DKI JAKARTA","lat":"-6.291710","lng":"106.886719"},{"placemark_id":"83472","name":"TERMINAL BUS PULOGADUNG","address":"BEKASI RAYA JAKARTA TIMUR DKI JAKARTA","lat":"-6.183110","lng":"106.908562"},{"placemark_id":"83475","name":"TERMINAL BUS RAWAMANGUN","address":"PERSERIKATAN 1 JAKARTA TIMUR DKI JAKARTA","lat":"-6.197940","lng":"106.890839"},{"placemark_id":"83480","name":"TERMINAL BUS SENEN","address":"PASAR SENEN JAKARTA PUSAT DKI JAKARTA","lat":"-6.173630","lng":"106.841438"},{"placemark_id":"83495","name":"TERMINAL BUS TANJUNG PRIOK","address":"TERMINAL BUS TANJUNG PRIOK JAKARTA UTARA DKI JAKARTA","lat":"-6.109990","lng":"106.881027"},{"placemark_id":"83773","name":"K5.17 TERMINAL KAMPUNG MELAYU","address":"JATINEGARA BARAT; TERMINAL BUS KAMPUNG MELAYU JAKARTA TIMUR DKI JAKARTA","lat":"-6.224870","lng":"106.866631"},{"placemark_id":"83774","name":"K7.01 TERMINAL KAMPUNG MELAYU","address":"JATINEGARA BARAT; TERMINAL BUS KAMPUNG MELAYU JAKARTA TIMUR DKI JAKARTA","lat":"-6.224960","lng":"106.866699"}],
      position_waze : []
    }
  }

  componentDidMount(){
    const getData = async () => {
      const {data} = await axios.get('http://waze.qlue.id/jakarta/update/0atxn84I3hx2WmNm5ifPDZkJaLERZD9A.json')
      this.setState({position_waze: data.alerts});
    }
    getData();
  }

  render() {
    const position = [-6.175110, 106.865039]
    const iconTerminal = L.icon({iconUrl:'http://www.qlue.co.id/vacancy/svc/icon-marker.png'})
    const iconHazard = L.icon({
      iconUrl: 'http://free-icon-download.com/modules/PDdownloads/images/screenshots/hazard-sign-images-general_warning.png',
      iconSize: [30, 30],
      iconAnchor: [12.5, 30],
      popupAnchor: [-3, -76]
    });
    const iconRoadCross = L.icon({
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Road_Closed_Ahead_sign.svg/768px-Road_Closed_Ahead_sign.svg.png',
      iconSize: [30,30],
      iconAnchor: [12.5, 30],
      popupAnchor: [-3, -76]
    })
    const iconJamRoad = L.icon({
      iconUrl: 'https://maxcdn.icons8.com/Share/icon/Transport//traffic_jam1600.png',
      iconSize: [30,30],
      iconAnchor: [12.5, 30],
      popupAnchor: [-3,-76]
    })
    const iconAccidentRoad = L.icon({
      iconUrl: 'https://staticcdns3.bidu.com.br/jamal/uploads/2015/02/02161832/car1-300x300.png',
      iconSize: [30,30],
      iconAnchor: [12.5, 30],
      popupAnchor: [-3,-76]
    })

    return (
      <div >
        <Map style={{height: "700px", width: "100%", border: "1px solid black"}} center={position} zoom={13}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {
          this.state.position.map(data => {
            return(
            <Marker position={[data.lat, data.lng]} icon={iconTerminal} key={data.placemark_id}>
              <Popup>
                <span>{`Name : ${data.name}`}<br/>{`Address : ${data.address}`}</span>
              </Popup>
            </Marker>
            )
          })
        }
        {
          this.state.position_waze.map(data_waze => {
            return(
              <Marker position={[+data_waze.location.y, +data_waze.location.x]} icon={
                (data_waze.type === "WEATHERHAZARD") ? 
                  iconHazard : 
                  (data_waze.type ==="JAM") ? 
                  iconJamRoad : 
                  (data_waze.type ==="ROAD_CLOSED") ?
                  iconRoadCross :
                  (data_waze.type === "ACCIDENT") ?
                  iconAccidentRoad :
                  null
                   } key={data_waze.uuid}>
                <Popup>
                  <span> Report Description : <br/>{
                    (data_waze.type === "JAM") ? 
                    "Jam Traffic" : 
                    (data_waze.type === "WEATHERHAZARD") ? 
                    "Hazard Problem" : 
                    (data_waze.type === "ROAD_CLOSED") ?
                    data_waze.reportDescription : 
                    "Accident Road"
                    }</span>
                </Popup>
                </Marker>
            )
          })
        }
      </Map>
      </div>
    );
  }
}

export default App;
