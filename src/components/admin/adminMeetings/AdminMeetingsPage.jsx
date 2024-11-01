import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import axios from '../../../api/instance';
import MonthlyChart from './MonthlyChart';
import RegionalChart from './RegionalChart';
import DistanceChart from './DistanceChart';
import ConceptChart from './ConceptChart';

const AdminMeetingsPage = () => {
  const [monthlyMeetings, setMonthlyMeetings] = useState([]);
  const [regionalMeetings, setRegionalMeetings] = useState([]);
  const [distanceMeetings, setDistanceMeetings] = useState([]);
  const [conceptMeetings, setConceptMeetings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [monthlyRes, regionalRes, distanceRes, conceptRes] =
          await Promise.all([
            axios.get('/admin/meeting?meetings=meetings_per_month'),
            axios.get('/admin/meeting?meeting=meetings_per_region'),
            axios.get('/admin/meeting?meeting=meetings_by_distance'),
            axios.get('/admin/meeting?meeting=meetings_by_concept')
          ]);

        setMonthlyMeetings(monthlyRes.data);
        setRegionalMeetings(regionalRes.data);
        setDistanceMeetings(distanceRes.data);
        setConceptMeetings(conceptRes.data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '50px' }}>
      <h1>모임 통계</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <h2>🏃‍♂️ 월별 모임 개설 수</h2>
          <MonthlyChart data={monthlyMeetings} />
        </Col>
        <Col xs={24} md={12}>
          <h2>🌍 지역별 모임 분포</h2>
          <RegionalChart data={regionalMeetings} />
        </Col>
        <Col xs={24} md={12}>
          <h2>📏 거리별 모임 분포</h2>
          <DistanceChart data={distanceMeetings} />
        </Col>
        <Col xs={24} md={12}>
          <h2>📋 컨셉별 모임 분포</h2>
          <ConceptChart data={conceptMeetings} />
        </Col>
      </Row>
    </div>
  );
};

export default AdminMeetingsPage;
