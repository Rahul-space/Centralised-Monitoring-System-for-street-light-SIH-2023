import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useContext,useRef,useEffect,useState } from "react";
import { Link } from "react-router-dom";
import {ZoneContext } from "../../context/zonecontext";
const Home = () => {
  const zone = useContext(ZoneContext);
  
  const mapRef = useRef(null);


  const[triggers,setTriggers]=useState(false);

  useEffect(() => {
    if (zone.length > 0) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.bing.com/api/maps/mapcontrol?key=AkiBfVXQW6vDDMPbMBM6Lti4M969maXpG3vAHqktoHgkcmagAcVs4b6qUUqLVEfp&callback=loadMapScenario`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      window.loadMapScenario = () => {
        const map = new window.Microsoft.Maps.Map(mapRef.current, {
          credentials: "AkiBfVXQW6vDDMPbMBM6Lti4M969maXpG3vAHqktoHgkcmagAcVs4b6qUUqLVEfp",
        });

        zone.forEach((zonee) => {
          const location = new window.Microsoft.Maps.Location(
            zonee.cordinates.lattitude,
            zonee.cordinates.longitude
          );

          const pin = new window.Microsoft.Maps.Pushpin(location);
          map.entities.push(pin);

          const infobox = new window.Microsoft.Maps.Infobox(location, {
            title: zonee.name,
            description: zonee.location,
          });

          map.entities.push(infobox);
        });

        const bounds = window.Microsoft.Maps.LocationRect.fromLocations(
          zone.map((zonee) =>
            new window.Microsoft.Maps.Location(
              zonee.cordinates.lattitude,
              zonee.cordinates.longitude
            )
          )
        );

        map.setView({ bounds });
      };
      setTriggers(false);
    }
  }, [zone]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar /> 
        <div className="listContainer">
           <div className="listTitle">Zone Details</div>
        <div id="map" ref={mapRef} style={{ width: "100%", height: "300px" }}></div>
        </div>
        <div className="listTitle" onClick={() => setTriggers(true)}>Zone Details</div>
        <div className="charts">
        <div className="widgets">
          {zone.map((d) => (
            <Link to={'/zone/'+d.mac} style={{ textDecoration: "none" }}>
                          <Widget
              props={d}
            />
            </Link>
          ))}
        </div>
        </div>
        <div className="charts">
          <Chart title="Zone Fault Chart" aspect={4 / 1} mode="fault" />
          <Chart title="Zone Working Chart" aspect={4 / 1} mode="working" />
        </div>

        <div className="listContainer">
          <div className="listTitle">Users Details</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
