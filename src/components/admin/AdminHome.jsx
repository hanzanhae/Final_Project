// import React from 'react';
// import { Card, Row, Col } from 'antd';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';

// // 더미 데이터 버전
// const dummyData = {
//   totalMembers: 1500,
//   reportedMembers: 25,
//   blacklistMembers: 10,
//   newMembers: [10, 15, 30, 45, 60, 70, 80, 90, 100, 110, 120, 130],
//   deactivatedMembers: [5, 7, 15, 12, 25, 22, 18, 20, 17, 13, 15, 10]
// };

// const lineChartData = {
//   labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
//   datasets: [
//     {
//       label: '신규 가입자 수',
//       data: dummyData.newMembers,
//       borderColor: 'rgba(75, 192, 192, 1)',
//       fill: false
//     },
//     {
//       label: '탈퇴 회원 수',
//       data: dummyData.deactivatedMembers,
//       borderColor: 'rgba(255, 99, 132, 1)',
//       fill: false
//     }
//   ]
// };

// const lineChartOptions = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top'
//     }
//   }
// };

// const Home = () => {
//   return (
//     <div style={{ padding: '50px' }}>
//       <h2>회원 통계</h2>
//       <Line data={lineChartData} options={lineChartOptions} />

//       <div style={{ marginTop: '40px' }}>
//         <Row gutter={16}>
//           <Col span={8}>
//             <Card title="총 회원 수" bordered={false}>
//               현재 총 회원: {dummyData.totalMembers}명
//             </Card>
//           </Col>
//           <Col span={8}>
//             <Card title="신고된 사용자 수" bordered={false}>
//               신고된 사용자: {dummyData.reportedMembers}명
//             </Card>
//           </Col>
//           <Col span={8}>
//             <Card title="블랙리스트 사용자 수" bordered={false}>
//               블랙리스트 사용자: {dummyData.blacklistMembers}명
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Home;

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
    newMembers: [],
    deactivatedMembers: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalMembersRes,
          reportedMembersRes,
          blacklistMembersRes,
          newMembersRes,
          deactivatedMembersRes
        ] = await Promise.all([
          axios.get('/admin/stats?stats=total'),
          axios.get('/admin/stats?stats=reported'),
          axios.get('/admin/stats?stats=blacklist'),
          axios.get('/admin/stats?stats=new-user'),
          axios.get('/admin/stats?stats=deativated-user')
        ]);

        setData({
          totalMembers: totalMembersRes.data.total,
          reportedMembers: reportedMembersRes.data.total,
          blacklistMembers: blacklistMembersRes.data.total,
          newMembers: newMembersRes.data.monthlyData,
          deactivatedMembers: deactivatedMembersRes.data.monthlyData
        });
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  const lineChartData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        label: '신규 가입자 수',
        data: data.newMembers,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      },
      {
        label: '탈퇴 회원 수',
        data: data.deactivatedMembers,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>회원 통계</h2>
      <Line data={lineChartData} options={lineChartOptions} />

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
