import './VideoInfo.css'
export default function VideoInfo(props){
    let frameNumber = props.frameNumber
    let histogram = props.histogram
    let rgbValue = props.rgbValue
    return(
        <div className='video-player-info'>
            <h1 className='card-title'>Frame Information</h1>
            <div className='card-section'>
                <div className='left-section'>
                    <div className='label-section'>
                        <div>Frame Number : </div>
                        <div> {frameNumber}</div>
                    </div>
                    <div className='label-section'>
                        <div>Bounding Box : </div>
                        <div> {frameNumber}</div>
                    </div>
                    <div className='label-section'>
                        <div>Histogram : </div>
                        <div> {histogram}</div>
                    </div>

                </div>
                <div className='right-section'>
                    <svg className="svg-container">
                        <rect width="100%" height="100%" fill={rgbValue} strokeWidth="3" stroke ="rgb(0,0,0)" />
                        Sorry, your browser does not support inline SVG.  
                    </svg>
                </div>
            </div>
        </div>
    )
}