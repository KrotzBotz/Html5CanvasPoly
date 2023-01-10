//**********************  REACT HOOKS  **********************//
import React, { useContext, useEffect, useRef, useState } from "react";

//**********************  SCSS/CSS  **********************//
import "./Atlas.scss";
//**********************  COMPONENTS  **********************//

//**********************  HELPER FILES  **********************//
import domImage from "./helper/CreateDOMimg";
import onMMove from "./helper/MouseFunctions/OnMMove";
import onMClick from "./helper/MouseFunctions/OnMClick";

//**********************  IMAGES  **********************//
import map from "../../../images/map_colorburn.png";

function Atlas() {
  const [mapReady, setMapReady] = useState(false);

  //TOOLS
  const [regionIndex, setRegionIndex] = useState(0);
  const regionI = useRef(0);

  const [regionText, setRegionText] = useState([""]);
  const [regions, setRegions] = useState([]);
  const domains = useRef([]);

  //END TOOLS

  const canvasRef = useRef();
  const mapRef = useRef();

  //drawing main map
  useEffect(() => {
    const cvs = canvasRef.current;
    domImage(map).then((image) => {
      const ctx = cvs.getContext("2d");
      cvs.width = image.width;
      cvs.height = image.height;
      ctx.drawImage(image, 0, 0);
      mapRef.current = image;
      setMapReady(true);
    });
  }, []);

  const ev = (e) => {
    let tmp = regionText.slice();
    tmp[regionIndex] = e.target.value;
    setRegionText([...tmp]);
  };

  useEffect(() => {
    if (!regionText[regionIndex]) {
      document.getElementById("taa").value = "";
    } else document.getElementById("taa").value = regionText[regionIndex];
  }, [regionIndex]);

  var domainColor = "";
  if (domains.current[regionIndex] && domains.current[regionIndex].color) {
    domainColor = `rgb(${domains.current[regionIndex].color.r},${domains.current[regionIndex].color.g},${domains.current[regionIndex].color.b})`;
  }
  return (
    <div className="atlas__container" style={{ zIndex: 3000 }}>
      <canvas
        className="map__canvas"
        id="mapCanvas"
        ref={canvasRef}
        onMouseMove={(e) => {
          onMMove(
            e,
            canvasRef.current,
            mapRef.current,
            monkeyClass,
            domains,
            regionI.current
          );
        }}
        onClick={(e) => {
          onMClick(
            e,
            canvasRef.current,
            domains,
            mapRef.current,
            monkeyClass,
            setRegions,
            regionI.current
          );
        }}
      ></canvas>
      <div className="domains__ui">
        <h2>Region {regionIndex + 1}</h2>
        <div
          style={{
            height: 50,
            width: 50,
            backgroundColor: domainColor,
          }}
        ></div>
        <textarea id="taa" onChange={ev}>
          {regionText[regionIndex]}
        </textarea>
        {regions[regionIndex] &&
          regions[regionIndex].map((element) => {
            return (
              <div>
                x: {element.x}, y: {element.y}
              </div>
            );
          })}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          className="tool_button"
          type="button"
          value="New Region"
          onClick={(e) => {
            regionI.current++;
            setRegionIndex(regionI.current);
          }}
        />
        <input
          type="button"
          className="tool_button"
          value="undo"
          onClick={(e) => {
            domains.current[regionI.current].removeLine();
            for (let i = 0; i < domains.current.length; ++i) {
              domains.current[i].draw(canvasRef.current);
            }
            let r = [];
            for (let i = 0; i < domains.current.length; ++i) {
              r.push(domains.current[i].getPoints());
            }
            setRegions([...r]);
          }}
        />
        <input
          type="button"
          className="tool_button"
          value=">>"
          onClick={(e) => {
            if (regionI.current + 1 === domains.current.length) return;
            regionI.current++;
            setRegionIndex(regionI.current);
            let tmp = regions.slice();
            setRegions([...tmp]);
          }}
        />
        <input
          type="button"
          className="tool_button"
          value="<<"
          onClick={(e) => {
            if (regionI.current === 0) return;
            regionI.current--;
            setRegionIndex(regionI.current);
            let tmp = regions.slice();
            setRegions([...tmp]);
          }}
        />
        <input
          type="button"
          className="tool_button"
          value="Export Console"
          onClick={(e) => {
            let info = [];
            for (let i = 0; i < domains.current.length; ++i) {
              let o = {};
              o.description = regionText[i];
              o.points = domains.current[i].getPoints();
              info.push(o);
            }
            console.log(JSON.stringify(info));
          }}
        />
      </div>
    </div>
  );
}

export default Atlas;
