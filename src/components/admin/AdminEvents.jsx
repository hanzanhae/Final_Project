// import React, { useEffect, useState } from 'react';
// import { Line, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import { Table, Button, message, Card } from 'antd';
// import axios from '../../api/instance';

// const AdminEvents = () => {
//   const [monthlyEvents, setMonthlyEvents] = useState([]);
//   const [monthlyParticipants, setMonthlyParticipants] = useState([]);
//   const [eventList, setEventList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {

//         const [eventsRes, participantsRes, eventListRes] = await Promise.all([
//           axios.get('/admin/stats/events-per-month'),
//           axios.get('/admin/event-participants-per-month'),
//           axios.get('/api/events')
//         ]);

//         setMonthlyEvents(eventsRes.data);
//         setMonthlyParticipants(participantsRes.data);
//         setEventList(eventListRes.data);
//       } catch (error) {
//         console.error('데이터를 가져오는 중 오류 발생:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const eventsChartData = {
//     labels: monthlyEvents.map((item) => item.month),
//     datasets: [
//       {
//         label: '월별 이벤트 개설 수',
//         data: monthlyEvents.map((item) => item.count),
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true
//       }
//     ]
//   };

//   const participantsChartData = {
//     labels: monthlyParticipants.map((item) => item.month),
//     datasets: [
//       {
//         label: '월별 이벤트 참가자 수',
//         data: monthlyParticipants.map((item) => item.count),
//         backgroundColor: 'rgba(153, 102, 255, 0.6)'
//       }
//     ]
//   };

//   const handleAction = async (eventId, action) => {
//     try {
//       await axios.patch(`/admin/events/${eventId}?action=${action}`);
//       message.success(`이벤트 ${action === 'approve' ? '승인' : '거부'} 완료`);
//       setEventList(eventList.filter((event) => event.id !== eventId));
//     } catch (error) {
//       console.error(`이벤트 ${action} 중 오류 발생:`, error);
//       message.error(`이벤트 ${action === 'approve' ? '승인' : '거부'} 중 오류 발생`);
//     }
//   };

//   const columns = [
//     {
//       title: '이벤트명',
//       dataIndex: 'name',
//       key: 'name'
//     },
//     {
//       title: '날짜',
//       dataIndex: 'date',
//       key: 'date'
//     },
//     {
//       title: '장소',
//       dataIndex: 'location',
//       key: 'location'
//     },
//     {
//       title: '인원',
//       dataIndex: 'participants',
//       key: 'participants'
//     },
//     {
//       title: '액션',
//       key: 'action',
//       render: (_, record) => (
//         <span>
//           <Button
//             type="primary"
//             onClick={() => handleAction(record.id, 'approve')}
//             style={{ marginRight: '8px' }}
//           >
//             승인
//           </Button>
//           <Button type="danger" onClick={() => handleAction(record.id, 'reject')}>
//             거부
//           </Button>
//         </span>
//       )
//     }
//   ];

//   return (
//     <div style={{ padding: '40px' }}>
//       <h1>이벤트 관리</h1>

//       <Card title="🆕 월별 이벤트 개설 수" style={{ marginBottom: '20px' }}>
//         <Line data={eventsChartData} options={{ responsive: true }} height={250} />
//       </Card>

//       <Card title="👥 월별 이벤트 참가자 수" style={{ marginBottom: '20px' }}>
//         <Bar data={participantsChartData} options={{ responsive: true }} height={250} />
//       </Card>

//       <Card title="📋 이벤트 목록">
//         <Table
//           columns={columns}
//           dataSource={eventList}
//           rowKey="id"
//           loading={loading}
//           pagination={false}
//         />
//       </Card>
//     </div>
//   );
// };

// export default AdminEvents;

import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Table, Button, message, Card, Row, Col } from 'antd';

const AdminEvents = () => {
  const [monthlyEvents, setMonthlyEvents] = useState([]);
  const [monthlyParticipants, setMonthlyParticipants] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMonthlyEvents([
        { month: '1월', count: 5 },
        { month: '2월', count: 8 },
        { month: '3월', count: 6 },
        { month: '4월', count: 12 },
        { month: '5월', count: 10 },
        { month: '6월', count: 7 }
      ]);

      setMonthlyParticipants([
        { month: '1월', count: 15 },
        { month: '2월', count: 12 },
        { month: '3월', count: 20 },
        { month: '4월', count: 18 },
        { month: '5월', count: 25 },
        { month: '6월', count: 22 }
      ]);

      setEventList([
        {
          id: 1,
          name: 'Spring Marathon',
          date: '2023-04-05',
          location: 'Seoul',
          participants: 50
        },
        {
          id: 2,
          name: 'Summer Run',
          date: '2023-06-15',
          location: 'Busan',
          participants: 30
        },
        {
          id: 3,
          name: 'Autumn Race',
          date: '2023-09-20',
          location: 'Incheon',
          participants: 45
        }
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const eventsChartData = {
    labels: monthlyEvents.map((item) => item.month),
    datasets: [
      {
        label: '월별 이벤트 개설 수',
        data: monthlyEvents.map((item) => item.count),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }
    ]
  };

  const participantsChartData = {
    labels: monthlyParticipants.map((item) => item.month),
    datasets: [
      {
        label: '월별 이벤트 참가자 수',
        data: monthlyParticipants.map((item) => item.count),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }
    ]
  };

  const handleAction = (eventId, action) => {
    message.success(`이벤트 ${action === 'approve' ? '승인' : '거부'} 완료`);
    setEventList(eventList.filter((event) => event.id !== eventId));
  };

  const columns = [
    {
      title: '이벤트명',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '장소',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: '인원',
      dataIndex: 'participants',
      key: 'participants'
    },
    {
      title: '액션',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => handleAction(record.id, 'approve')}
            style={{ marginRight: '8px' }}
          >
            승인
          </Button>
          <Button
            type="danger"
            onClick={() => handleAction(record.id, 'reject')}
          >
            거부
          </Button>
        </span>
      )
    }
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h1>이벤트 관리</h1>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} md={12}>
          <Card title="🆕 월별 이벤트 개설 수">
            <Line
              data={eventsChartData}
              options={{ responsive: true }}
              height={250}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="👥 월별 이벤트 참가자 수">
            <Bar
              data={participantsChartData}
              options={{ responsive: true }}
              height={250}
            />
          </Card>
        </Col>
      </Row>

      <Card title="📋 이벤트 목록">
        <Table
          columns={columns}
          dataSource={eventList}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default AdminEvents;
