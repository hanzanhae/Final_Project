import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import axios from '../../../api/instance';
import StatsCard from './StatsCard';
import MixChart from './MixChart';
import styled from 'styled-components';

const AdminHomePage = () => {
  const [data, setData] = useState({
    totalMembers: 0,
    reportedMembers: 0,
    blacklistMembers: 0,
    newMembers: Array(12).fill(0),
    disabledMembers: Array(12).fill(0)
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.allSettled([
          axios.get('/admin/user/statsCount?statsCount=TOTAL'),
          axios.get('/admin/user/statsCount?statsCount=REPORTED'),
          axios.get('/admin/user/statsCount?statsCount=BLACKLIST'),
          axios.get('/admin/user/monthly-status?status=ACTIVE'),
          axios.get('/admin/user/monthly-status?status=DISABLED')
        ]);

        const [
          totalRes,
          reportedRes,
          blacklistRes,
          newMembersRes,
          deactivatedRes
        ] = results;

        setData({
          totalMembers:
            totalRes.status === 'fulfilled'
              ? totalRes.value.data.user_count
              : 0,
          reportedMembers:
            reportedRes.status === 'fulfilled'
              ? reportedRes.value.data.user_count
              : 0,
          blacklistMembers:
            blacklistRes.status === 'fulfilled'
              ? blacklistRes.value.data.user_count
              : 0,
          newMembers:
            newMembersRes.status === 'fulfilled'
              ? processMonthlyData(newMembersRes.value.data)
              : [],
          disabledMembers:
            deactivatedRes.status === 'fulfilled'
              ? processMonthlyData(deactivatedRes.value.data)
              : []
        });
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [
  //         totalMembersRes,
  //         reportedMembersRes,
  //         blacklistMembersRes,
  //         newMembersRes,
  //         disabledMembersRes
  //       ] = await Promise.all([
  //         axios.get('/admin/user/statsCount?statsCount=TOTAL'),
  //         axios.get('/admin/user/statsCount?statsCount=REPORTED'),
  //         axios.get('/admin/user/statsCount?statsCount=BLACKLIST'),
  //         axios.get('/admin/user/monthly-status?status=ACTIVE'),
  //         axios.get('/admin/user/monthly-status?status=DISABLED')
  //       ]);

  const processMonthlyData = (responseData) => {
    const monthlyData = Array(12).fill(0);
    responseData.forEach(({ month, user_count }) => {
      const monthIndex = new Date(month).getMonth();
      monthlyData[monthIndex] = user_count;
    });
    return monthlyData;
  };

  //       setData({
  //         totalMembers: totalMembersRes.data.user_count || 0,
  //         reportedMembers: reportedMembersRes.data.user_count || 0,
  //         blacklistMembers: blacklistMembersRes.data.user_count || 0,
  //         newMembers: processMonthlyData(newMembersRes.data),
  //         disabledMembers: processMonthlyData(disabledMembersRes.data)
  //       });
  //     } catch (error) {
  //       console.error('데이터를 가져오는 중 에러 발생:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Container>
      <h1>회원 통계</h1>
      <MixChart
        newMembers={data.newMembers}
        disabledMembers={data.disabledMembers}
      />

      <Row gutter={16} style={{ marginTop: '40px' }}>
        <Col span={8}>
          <StatsCard
            title="총 회원 수"
            count={`현재 총 회원: ${data.totalMembers}명`}
          />
        </Col>
        <Col span={8}>
          <StatsCard
            title="신고된 사용자 수"
            count={`신고된 사용자: ${data.reportedMembers}명`}
          />
        </Col>
        <Col span={8}>
          <StatsCard
            title="블랙리스트 사용자 수"
            count={`블랙리스트 사용자: ${data.blacklistMembers}명`}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHomePage;

const Container = styled.div`
  padding: 50px;
`;
