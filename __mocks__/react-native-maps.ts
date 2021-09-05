const mock = jest.genMockFromModule('react-native-maps');

const MapView = jest.fn(({ children }) => null)
export const Marker = jest.fn(({ children }) => null)
export interface LatLng {
    latitude: number;
    longitude: number;
}
export default MapView