import * as d3 from 'd3'
import React from 'react';

export default function Tracker(props){
    
    let width, height,svg,xScale,color;
    let data = props.data
    React.useEffect(()=>{
        console.log("Inside",data.length)
        // console.log("Props",document.getElementById("video").offsetWidth)
        width = document.getElementById("video").offsetWidth
        height = 40 || document.getElementById("svg").offsetHeight
        // console.log("Width",width,height)
        // let levels = [0,1,2,3,4,5,6,7,8,9,10,11,12]
        let levels = data.map((el,i)=>i)
        xScale = d3.scaleBand().domain(levels).range([0,width])
        color = d3.scaleQuantile().domain([0,data.length]).range(data)
        createBars(levels)
    },[data.length])

    function createBars(levels){
        initGraph()
        initBars(levels)
    }
    function initGraph(){
        d3.select(".tracker-svg-container svg").remove();
        svg = d3
            .select(".tracker-svg-container")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${width} ${height}`)
    }
    function initBars(levels){
        svg.selectAll("rect")
        .data(levels)
        .enter()
        .append("rect")
        .attr("class","bar-progress")
        .attr("data-id",d =>d)
        .attr("x",d => xScale(d))
        .attr("y",0)
        .attr("width",xScale.bandwidth())
        .attr("stroke-width",xScale.bandwidth()*2)
        .attr("height",15)
        .attr("fill",function(d,i){
            return color(i)
        })
    }

    return(
        <div id="svg" className="tracker-svg-container"></div>
    )
}