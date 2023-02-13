import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const MapInput = ({ setValue, value, ...props }) => (
  <Input
    type="number"
    w="45%"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    {...props}
  />
);

const Map = () => {
  const [lat, setLat] = useState("40.7831");
  const [long, setLong] = useState("-73.971321");
  const [cityAndCountry, setCityAndCountry] = useState("St. Petersburg, FL");
  const mapRef = useRef();

  useEffect(() => {
    if(mapboxgl) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
      const map = new mapboxgl.Map({
        container: "map", // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        //   center: [-82.6695085, 27.7703796], // starting position ([lng, lat] for Mombasa, Kenya)
        zoom: 1, // starting zoom
      });
      mapRef.current = map;
    }
  }, []);

  //Helpers
  const getBoxBounds = (boxBounds) => {
    //Return the southwestern and northeastern corners of the bounding box
    //Here is an example
    // https://docs.mapbox.com/mapbox-gl-js/example/fitbounds/
    const swCornerBounds = [
        parseFloat(boxBounds[3]),
        parseFloat(boxBounds[1]),
    ];
    const nwCornerBounds = [
        parseFloat(boxBounds[2]),
        parseFloat(boxBounds[0]),
    ];

    return [swCornerBounds, nwCornerBounds];
  };


  const fitItInFlorida = () => {
    if (mapRef.current) {
      mapRef.current.fitBounds([
        [-89.811035, 23.940684],
        [-73.122803, 31.235923],
      ]);
    }
  };
  const fitBasednLatLong = async () => {
    if (
      mapRef.current &&
      mapRef.current.fitBounds &&
      !isNaN(lat) &&
      !isNaN(long)
    ) {
      const { data: latLongData } = await axios.post(
        "/api/getLocationBasedOnLatLong",
        { lat: parseFloat(lat), long: parseFloat(long) }
      );
      setTimeout(() => {
        mapRef.current.fitBounds(getBoxBounds(latLongData.boundingbox));
      }, 0);
    }
  };
  const fitBasedOnLocation = async () => {
    if (mapRef.current && mapRef.current.fitBounds && cityAndCountry) {
      const { data: locationData } = await axios.post(
        "/api/getLocationBasedOnName",
        { location: cityAndCountry }
      );
      setTimeout(() => {
        mapRef.current.fitBounds(getBoxBounds(locationData.boundingbox));
      }, 0);
    }
  };

  return (
    <VStack>
      <Text position='relative' _before={{
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        animation: 'changeHeaderText 20s infinite alternate',
        transition: 'all 0.5s',
        textAlign: 'center',
      }} height='4rem' width='50vw' fontSize="3rem"></Text>
      <Text fontSize="2rem">Find By City and Country</Text>
      <HStack w="100%" flexWrap="wrap" justify='center'>
        <MapInput
          type="text"
          placeholder="City, Country"
          value={cityAndCountry}
          setValue={setCityAndCountry}
        />
      </HStack>
      <Text fontSize="2rem">Find By Latidude and Longitude</Text>
      <HStack w="100%" flexWrap="wrap">
        <MapInput placeholder="Latitude" value={lat} setValue={setLat} />
        <MapInput placeholder="Longitude" value={long} setValue={setLong} />
      </HStack>
      <Box h="35rem" w="35rem" id="map" />
      <br />
      <Button onClick={fitItInFlorida} id="fit">
        Fit to Florida
      </Button>
      <Button onClick={fitBasednLatLong}>Fit based on Lat and Long</Button>
      <Button onClick={fitBasedOnLocation}>Fit Based on Location</Button>
    </VStack>
  );
};

export default Map;
