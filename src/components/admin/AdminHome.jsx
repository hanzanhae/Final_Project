import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from '../../api/instance';

const AdminHome = () => {
  const [data, setData] = useState({
    totalMembers: 0,
    reportedMembers: 0,
    blacklistMembers: 0,
    newMembers: Array(12).fill(null),
    disabledMembers: Array(12).fill(null)
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalMembersRes,
          reportedMembersRes,
          blacklistMembersRes,
          newMembersRes,
          disabledMembersRes
        ] = await Promise.all([
          axios.get('/admin/user/statsCount?statsCount=TOTAL'),
          axios.get('/admin/user/statsCount?statsCount=REPORTED'),
          axios.get('/admin/user/statsCount?statsCount=BLACKLIST'),
          axios.get('/admin/user/monthly-status?status=ACTIVE'),
          axios.get('/admin/user/monthly-status?status=DISABLED')
        ]);

        const processMonthlyData = (responseData) => {
          const monthlyData = Array(12).fill(null);
          responseData.forEach(({ month, user_count }) => {
            const monthIndex = new Date(month).getMonth();
            monthlyData[monthIndex] = user_count;
          });
          return monthlyData;
        };

        console.log('신규 회원 원본 데이터:', newMembersRes.data);
        console.log(
          '신규 회원 월별 데이터:',
          processMonthlyData(newMembersRes.data)
        );

        console.log('탈퇴 회원 원본 데이터:', disabledMembersRes.data);
        console.log(
          '탈퇴 회원 월별 데이터:',
          processMonthlyData(disabledMembersRes.data)
        );

        setData({
          totalMembers: totalMembersRes.data.user_count || 0,
          reportedMembers: reportedMembersRes.data.user_count || 0,
          blacklistMembers: blacklistMembersRes.data.user_count || 0,
          newMembers: processMonthlyData(newMembersRes.data),
          disabledMembers: processMonthlyData(disabledMembersRes.data)
        });
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  const lineChartData = {
    labels: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월'
    ],
    datasets: [
      {
        label: '신규 가입자 수',
        data: data.newMembers,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      },
      {
        label: '탈퇴 회원 수',
        data: data.disabledMembers,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false
      }
    ]
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>회원 통계</h2>
      <Line data={lineChartData} />

      <div style={{ marginTop: '40px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="총 회원 수" bordered={false}>
              현재 총 회원: {data.totalMembers}명
            </Card>
          </Col>
          <Col span={8}>
            <Card title="신고된 사용자 수" bordered={false}>
              신고된 사용자: {data.reportedMembers}명
            </Card>
          </Col>
          <Col span={8}>
            <Card title="블랙리스트 사용자 수" bordered={false}>
              블랙리스트 사용자: {data.blacklistMembers}명
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminHome;
