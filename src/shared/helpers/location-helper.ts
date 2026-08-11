export const SUKABUMI_CENTER: [number, number] = [-6.91813196, 106.93157004];

export function getCurrentPosition(
  setMarkerPosition: (lat: number, lng: number) => void,
) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      setMarkerPosition(latitude, longitude);
    },
    () => {},
    { enableHighAccuracy: true, timeout: 5000 },
  );
}
