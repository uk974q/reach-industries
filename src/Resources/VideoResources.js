import './VideoResources.css'
import React from 'react';
import * as d3 from 'd3'

import VideoInfo from '../VideoInfo/VideoInfo';
import Spinner from '../Spinner/Spinner';
import Tracker from '../Tracker/Tracker';

export default function VideoResources(props){
    let deviceId = props.deviceId
    const [loadSpinner,setLoadSpinner] = React.useState(true)
    const [frameNumber,setFrameNumber] = React.useState(0);
    const [histogram,setHistogram] = React.useState(0);
    const [rgbValue,setRgbValue] = React.useState('rgb(0,0,0)');
    const [resourceData,setResourceData] = React.useState([])
    const [frameData,setFrameData] = React.useState([])

    React.useEffect((el) => {
      document.querySelector(".video-player-details-page").classList.remove("d-none")
      fetch(`https://mockapi.lumi.systems/getdevicedata?deviceId=${deviceId}`).then(res => res.json())
      .then(response => {
        setLoadSpinner(false)
        if(!response.output){
          document.querySelector(".video-player-details-page").classList.add("d-none")
          document.querySelector(".error").classList.remove("d-none")
          return;
        }
        fetch("https://cors-anywhere.herokuapp.com/"+response.output.cvmdata).then(res => res.json()).then(jsonData => {
          let data = Object.values(jsonData["frame_data"]).map(el =>{
            let r = el["avgR"]
            let g = el["avgG"]
            let b = el["avgB"]
            return `rgb(${r},${g},${b})`
          })
          setFrameData(data)
          // console.log("Json DAta",jsonData)
          var video = document.getElementById('video')
          setResourceData(<source src={response.output.videofiles}type="video/mp4"/>)
          var frameCounter = (time, metadata) => {
            let count = metadata.mediaTime * 12;
            let frameCount = Math.round(count)
            setFrameNumber(frameCount)
            setHistogram(+(jsonData["frame_data"][frameCount].histDiff).toFixed(3))
            let r = jsonData["frame_data"][frameCount]["avgR"]
            let g = jsonData["frame_data"][frameCount]["avgG"]
            let b = jsonData["frame_data"][frameCount]["avgB"]
            setRgbValue(`rgb(${r},${g},${b})`)
            setOpacity(frameCount)          
            video?.requestVideoFrameCallback(frameCounter);
          }
          video?.requestVideoFrameCallback(frameCounter)
        })
        
      })
    },[deviceId])

    function setOpacity(id){
      d3.selectAll(".bar-progress").attr("opacity",0.7)
      d3.selectAll(".bar-progress").attr("stroke","none")
      d3.select(`rect[data-id="${id}"]`).attr("opacity",1)
      d3.select(`rect[data-id="${id}"]`).attr("stroke","black")
    }

    return(
      <div className='video-player-details-page'>
        {!loadSpinner &&  
          <div className='video-section'>
            <div className='canvas'>
              <video className="video-container" controls width="250" id="video">
                  {resourceData}
                  Sorry, your browser doesn't support embedded videos.
              </video>
            </div>
            <Tracker data={frameData}/>
            <VideoInfo frameNumber={frameNumber} histogram={histogram} rgbValue={rgbValue}/>
          </div>
        }
        {loadSpinner && <Spinner/>}
      </div>
    )
}