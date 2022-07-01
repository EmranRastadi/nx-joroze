import {
  MapContainer,
  MapContainerProps,
  Marker,
  TileLayer,
  Tooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

function MapPlaceholder() {
  return (
    <p>
      Map. <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}

export interface MapProps extends MapContainerProps {
  position: [number, number];
  tooltipContent?: React.ReactNode;
}

const Map = ({ position, tooltipContent, ...rest }: MapProps) => {
  return (
    <MapContainer
      center={position}
      zoom={11}
      placeholder={<MapPlaceholder />}
      scrollWheelZoom={false}
      attributionControl={false}
      style={{ height: '100%', width: '100%' }}
      {...rest}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        {!!tooltipContent && <Tooltip>{tooltipContent}</Tooltip>}
      </Marker>
    </MapContainer>
  );
};

export default Map;
