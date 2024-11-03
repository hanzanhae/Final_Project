// import React, { useState, useEffect } from 'react';
// import { Line, Bar, Doughnut } from 'react-chartjs-2';
// import 'chart.js/auto';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { Row, Col } from 'antd';
// import axios from '../../api/instance';

// const AdminMeetings = () => {
//   const [monthlyMeetings, setMonthlyMeetings] = useState([]);
//   const [regionalMeetings, setRegionalMeetings] = useState([]);
//   const [distanceMeetings, setDistanceMeetings] = useState([]);
//   const [conceptMeetings, setConceptMeetings] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [monthlyRes, regionalRes, distanceRes, conceptRes] = await Promise.all([
//           axios.get('/admin/meeting?meetings=meetings-per-month'),
//           axios.get('/admin/meeting?meeting=meetings-per-region'),
//           axios.get('/admin/meeting?meeting=meetings-by-distance'),
//           axios.get('/admin/meeting?meeting=meetings-by-concept'),
//         ]);

//         setMonthlyMeetings(monthlyRes.data);
//         setRegionalMeetings(regionalRes.data);
//         setDistanceMeetings(distanceRes.data);
//         setConceptMeetings(conceptRes.data);
//       } catch (error) {
//         console.error('데이터를 가져오는 중 오류 발생:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const monthlyChartData = {
//     labels: monthlyMeetings.map((item) => item.month),
//     datasets: [
//       {
//         label: '월별 모임 개설 수',
//         data: monthlyMeetings.map((item) => item.count),
//         borderColor: 'rgba(75, 192, 192, 1)',
//         fill: false,
//       },
//     ],
//   };

//   const regionalChartData = {
//     labels: regionalMeetings.map((item) => item.region),
//     datasets: [
//       {
//         label: '지역별 모임 분포',
//         data: regionalMeetings.map((item) => item.count),
//         backgroundColor: 'rgba(153, 102, 255, 0.6)',
//       },
//     ],
//   };

//   const distanceChartData = {
//     labels: distanceMeetings.map((item) => item.distance),
//     datasets: [
//       {
//         label: '거리별 모임 분포',
//         data: distanceMeetings.map((item) => item.count),
//         backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
//       },
//     ],
//   };

//   const conceptChartData = {
//     labels: conceptMeetings.map((item) => item.concept),
//     datasets: [
//       {
//         label: '컨셉별 모임 분포',
//         data: conceptMeetings.map((item) => item.count),
//         backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 205, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
//       },
//     ],
//   };

//   const donutOptions = {
//     responsive: true,
//     plugins: {
//       datalabels: {
//         formatter: (value, context) => {
//           const total = context.chart.data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);
//           const percentage = ((value / total) * 100).toFixed(1);
//           return `${percentage}%`;
//         },
//         color: '#fff',
//         font: {
//           weight: 'bold',
//           size: 12,
//         },
//       },
//     },
//   };

//   const barOptions = {
//     responsive: true,
//     indexAxis: 'y',
//     plugins: {
//       datalabels: {
//         align: 'end',
//         anchor: 'end',
//         color: '#555',
//         font: {
//           weight: 'bold',
//         },
//         formatter: (value) => `${value}명`,
//       },
//     },
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>모임 통계</h1>
//       <Row gutter={[16, 16]}>
//         <Col xs={24} md={12}>
//           <h2>🏃‍♂️ 월별 모임 개설 수</h2>
//           <Line data={monthlyChartData} options={{ responsive: true }} width={300} height={250} />
//         </Col>
//         <Col xs={24} md={12}>
//           <h2>🌍 지역별 모임 분포</h2>
//           <Bar data={regionalChartData} options={barOptions} plugins={[ChartDataLabels]} width={300} height={250} />
//         </Col>
//         <Col xs={24} md={12}>
//           <h2>📏 거리별 모임 분포</h2>
//           <Doughnut data={distanceChartData} options={donutOptions} plugins={[ChartDataLabels]} width={300} height={250} />
//         </Col>
//         <Col xs={24} md={12}>
//           <h2>📋 컨셉별 모임 분포</h2>
//           <Doughnut data={conceptChartData} options={donutOptions} plugins={[ChartDataLabels]} width={300} height={250} />
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default AdminMeetings;

import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Row, Col } from 'antd';

const AdminMeetings = () => {
  const [monthlyMeetings, setMonthlyMeetings] = useState([]);
  const [regionalMeetings, setRegionalMeetings] = useState([]);
  const [distanceMeetings, setDistanceMeetings] = useState([]);
  const [conceptMeetings, setConceptMeetings] = useState([]);

  useEffect(() => {
    setMonthlyMeetings([
      { month: '1월', count: 5 },
      { month: '2월', count: 8 },
      { month: '3월', count: 6 },
      { month: '4월', count: 10 },
      { month: '5월', count: 15 },
      { month: '6월', count: 9 },
      { month: '7월', count: 12 },
      { month: '8월', count: 14 },
      { month: '9월', count: 7 },
      { month: '10월', count: 13 },
      { month: '11월', count: 5 },
      { month: '12월', count: 11 }
    ]);

    setRegionalMeetings([
      { region: '서울', count: 20 },
      { region: '부산', count: 10 },
      { region: '대구', count: 5 },
      { region: '인천', count: 8 },
      { region: '광주', count: 7 }
    ]);

    setDistanceMeetings([
      { distance: '5km 이하', count: 15 },
      { distance: '10km 이하', count: 10 },
      { distance: '15km 이하', count: 5 }
    ]);

    setConceptMeetings([
      { concept: '런린이', count: 20 },
      { concept: '고인물', count: 10 },
      { concept: '마라톤', count: 15 },
      { concept: '모닝 런닝', count: 8 },
      { concept: '퇴근 런닝', count: 12 }
    ]);
  }, []);

  const monthlyChartData = {
    labels: monthlyMeetings.map((item) => item.month),
    datasets: [
      {
        label: '월별 모임 개설 수',
        data: monthlyMeetings.map((item) => item.count),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }
    ]
  };

  const regionalChartData = {
    labels: regionalMeetings.map((item) => item.region),
    datasets: [
      {
        label: '지역별 모임 분포',
        data: regionalMeetings.map((item) => item.count),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }
    ]
  };

  const distanceChartData = {
    labels: distanceMeetings.map((item) => item.distance),
    datasets: [
      {
        label: '거리별 모임 분포',
        data: distanceMeetings.map((item) => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ]
      }
    ]
  };

  const conceptChartData = {
    labels: conceptMeetings.map((item) => item.concept),
    datasets: [
      {
        label: '컨셉별 모임 분포',
        data: conceptMeetings.map((item) => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ]
      }
    ]
  };

  const donutOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (acc, cur) => acc + cur,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end',
        color: '#555',
        font: {
          weight: 'bold'
        },
        formatter: (value) => `${value}명`
      }
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>모임 통계</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <h2>🏃‍♂️ 월별 모임 개설 수</h2>
          <Line
            data={monthlyChartData}
            options={{ responsive: true }}
            width={300}
            height={250}
          />
        </Col>
        <Col xs={24} md={12}>
          <h2>🌍 지역별 모임 분포</h2>
          <Bar
            data={regionalChartData}
            options={barOptions}
            plugins={[ChartDataLabels]}
            width={300}
            height={250}
          />
        </Col>
        <Col xs={24} md={12}>
          <h2>📏 거리별 모임 분포</h2>
          <Doughnut
            data={distanceChartData}
            options={donutOptions}
            plugins={[ChartDataLabels]}
            width={300}
            height={250}
          />
        </Col>
        <Col xs={24} md={12}>
          <h2>📋 컨셉별 모임 분포</h2>
          <Doughnut
            data={conceptChartData}
            options={donutOptions}
            plugins={[ChartDataLabels]}
            width={300}
            height={250}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AdminMeetings;
