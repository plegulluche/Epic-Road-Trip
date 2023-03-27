import GoogleMapReact from 'google-map-react'

export default function GoogleMap({lng, lat}) {
    const AnyReactComponent = ({ text }) => <img style={{position: 'absolute', transform: 'translate(-50%, -100%)'}} width={30} height={30} src="/pin.png"></img>;

    const defaultProps = {
        center: {
          lat: lat,
          lng: lng
        },
        zoom: 6
      };
    return (
        <div className='h-[500px] w-[100%] mb-10'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA3mKtes7tYJIRy65AOV6aQs5YjgsQowz4" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                lat={lat}
                lng={lng}
                />
            </GoogleMapReact>
        </div>  
    )
}