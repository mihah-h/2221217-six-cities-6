import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferType } from '../../mocks/offers';

type MapProps = {
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  offers: OfferType[];
  activeOfferId?: string | null;
};

const defaultCustomIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 39],
});

const activeCustomIcon = L.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 39],
});

function Map({ city, offers, activeOfferId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    offers.forEach((offer) => {
      const marker = L.marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      }, {
        icon: offer.id === activeOfferId ? activeCustomIcon : defaultCustomIcon,
      });

      marker.addTo(mapInstanceRef.current!);
      markersRef.current.push(marker);
    });
  }, [city, offers, activeOfferId]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>;
}

export default Map;
