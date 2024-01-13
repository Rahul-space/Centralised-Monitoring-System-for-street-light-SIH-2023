import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "./table/Table";
import Listlight from "./table/Lights";
import { useEffect,useRef,useContext } from "react";
import { ZoneContext } from "../../context/zonecontext";
import { useParams } from "react-router-dom";

const Single = () => {
  const data = useContext(ZoneContext);
  const {mac} = useParams();
  const w = data.filter((d) => d.mac == mac);
  const zone = w[0];








  const mapRef = useRef(null);

  useEffect(() => {
    if (zone) {
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

        const location = new window.Microsoft.Maps.Location(
          zone.cordinates.lattitude,
          zone.cordinates.longitude
        );
        const infobox = new window.Microsoft.Maps.Infobox(location, {
          title: zone.name,
          description: zone.location, // Add other information if needed
        });

        const pin = new window.Microsoft.Maps.Pushpin(location);
        map.entities.push(pin);
        map.entities.push(infobox);

        map.setView({
          center: location,
          zoom: 16,
        });
      };
    }
  }, []);








  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Zone Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{zone.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">module ID: </span>
                  <span className="itemValue">{zone.mac}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">zone code: </span>
                  <span className="itemValue">{zone.zone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">address: </span>
                  <span className="itemValue">{zone.location}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">lattitude: </span>
                  <span className="itemValue">{zone.cordinates.lattitude}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">status:</span>
                  <span className="itemValue">
                    {zone.faults !== true ? "Working" : "Faulty action Required"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">No of lights: </span>
                  <span className="itemValue">{zone.lights.length}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">No of Faulty:</span>
                  <span className="itemValue">{zone.faultcount}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">last data fetch:</span>
                  <span className="itemValue">{zone.updatedAt}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
            <div id="map" ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
          </div>
        </div>
        
        <div className="bottom">
        <h1 className="title">Street Light Informations</h1>
        <Listlight zone={zone}/>
        </div>
        <div className="bottom">
        <h1 className="title">Street Light Incharges information</h1>
        <List zone={zone}/>
          </div>
      </div>
    </div>
  );
};
export default Single;