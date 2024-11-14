import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const KakaoMapSearch = ({ map, gatherings, clearMarkers }) => {
  const [keyword, setKeyword] = useState('');
  const [filteredGatherings, setFilteredGatherings] = useState(gatherings); // 초기에는 전체 모임 목록을 표시
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();
  // console.log(gatherings);
  useEffect(() => {
    setFilteredGatherings(gatherings);
  }, [gatherings]);

  const handleSearch = () => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요!');
      return;
    }
    clearMarkers();
    const results = gatherings.filter((gathering) =>
      gathering.title.includes(keyword)
    );
    setFilteredGatherings(results); // 필터링된 모임을 상태로 업데이트
    displayMarkers(results); // 지도에 필터링된 마커 표시
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const displayMarkers = (places) => {
    markers.forEach((marker) => marker.setMap(null));
    const newMarkers = places.map((place) => {
      const markerPosition = new window.kakao.maps.LatLng(
        place.location.coordinates.y,
        place.location.coordinates.x
      );
      const marker = new window.kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);

      return marker;
    });
    setMarkers(newMarkers);
  };

  const navigateDetailPage = (id) => {
    navigate(`/gatherings/${id}`);
  };

  const moveToMarker = (place) => {
    const markerPosition = new window.kakao.maps.LatLng(
      place.location.coordinates.y,
      place.location.coordinates.x
    );
    map.setCenter(markerPosition);
    map.setLevel(3);
  };

  return (
    <Container>
      <SearchBox>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
        />
        <button onClick={handleSearch}>검색</button>
      </SearchBox>
      <ResultList>
        {filteredGatherings.map((gathering, index) => (
          <ResultItem
            key={index}
            // onClick={() => navigateDetailPage(gathering.id)}
            onClick={() => moveToMarker(gathering)}
          >
            <h5>{gathering.title}</h5>
            <p>{gathering.description}</p>
          </ResultItem>
        ))}
      </ResultList>
    </Container>
  );
};

export default KakaoMapSearch;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 0 10px 1px #32b4cd;
  padding: 1vw;
`;

const SearchBox = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 8%;
  input {
    width: 12vw;
    height: 2.4vw;
    padding: 0.4vw;
    outline: none;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    border: 2px solid #32b4cd;
    border-right: 0;
  }
  button {
    padding: 0.4vw;
    height: 2.4vw;
    padding: 0.4vw;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    border: 2px solid #32b4cd;
    border-left: 0;
  }
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-height: 92%;
  overflow-y: auto;
`;

const ResultItem = styled.li`
  padding: 0.4vw;
  border-bottom: 1px solid #ddd;
`;
