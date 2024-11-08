import { useState, useCallback } from 'react';
import axios from 'axios';

const useLocationAddress = () => {
  const [addressInfo, setAddressInfo] = useState({
    detailAddress: '', // 상세주소
    region1Depth: '', // 도시
    region2Depth: '', // 구
    region3Depth: '', // 동
    fullAddress: '' // 도시 + 구 + 동
  });
  const [errorMsg, setErrorMsg] = useState('');

  const getAddressText = useCallback(async (lat, lon) => {
    const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`
        }
      });

      const documents = response.data.documents;
      if (documents.length > 0) {
        const address = documents[0].address;
        const fullAddress = `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`;
        const detailAddress = documents[0].address.address_name;

        setAddressInfo({
          detailAddress: detailAddress,
          region1Depth: address.region_1depth_name,
          region2Depth: address.region_2depth_name,
          region3Depth: address.region_3depth_name,
          fullAddress: fullAddress
        });
      }
    } catch (error) {
      console.error('주소텍스트를 가져오는 데 실패했습니다:', error);
      setErrorMsg('주소텍스트를 가져오는 데 실패했습니다.');
    }
  }, []);

  return {
    addressInfo,
    errorMsg,
    getAddressText
  };
};

export default useLocationAddress;
