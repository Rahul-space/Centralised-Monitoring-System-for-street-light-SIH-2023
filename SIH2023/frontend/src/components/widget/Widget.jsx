import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";


const Widget = ({ props }) => {
  let data;

  switch (props.faults) {
    case false:
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        // Additional style for background color based on faults prop
        style: {
          backgroundColor: props.faults ? 'rgb(153, 0, 0)' : 'rgb(0, 204, 204)',
          color: props.faults ? 'rgb(170, 0, 0)' : 'inherit',
          
        },
      };
      break;
    case true:
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        // Additional style for background color based on faults prop
        style: {
          backgroundColor: props.faults ? 'rgba(255, 102, 0, 0.71)' : 'inherit',
          color: props.faults ? 'rgb(128, 0, 0)' : 'inherit',
        },
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget" style={data.style}>
      <div className="left">
        <span className="title">{props.name}</span>
        <span className="link">{props.mac}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {props.lights.length} 
        </div>
        {props.faultcount}
      </div>
    </div>
  );
};

export default Widget;
