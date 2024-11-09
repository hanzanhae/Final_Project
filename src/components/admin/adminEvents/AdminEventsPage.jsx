import React, { useEffect, useState } from 'react';
import { Row, Col, Card, message } from 'antd';
import axios from '../../../api/instance';
import EventsChart from './EventsChart';
import ParticipantsChart from './ParticipantsChart';
import EventsTable from './EventTable';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(false);
  const [eventsChartData, setEventsChartData] = useState([]);
  const [participantsChartData, setParticipantsChartData] = useState([]);

  useEffect(() => {
    fetchEvents(currentPage);
    fetchChartsData();
  }, [currentPage]);

  const fetchEvents = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/admin/events?page=${page - 1}&size=5`);
      setEvents(response.data.content);
      setTotalEvents(response.data.totalElements);
    } catch (error) {
      console.error('이벤트 데이터 가져오기 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChartsData = async () => {
    try {
      const [eventsData, participantsData] = await Promise.all([
        axios.get('/admin/stats/events_per_month'),
        axios.get('/admin/event_participants-per_month')
      ]);
      setEventsChartData(eventsData.data);
      setParticipantsChartData(participantsData.data);
    } catch (error) {
      console.error('차트 데이터 가져오기 오류:', error);
    }
  };

  const handleAction = async (eventId, action, email) => {
    try {
      await axios.patch(`/admin/events/${eventId}?action=${action}`, {
        status: action === 'approve' ? 'APPROVED' : 'REJECTED',
        email: email,
        report_reason: action === 'reject' ? '신고 내역에 따른 거절' : null
      });
      message.success(
        `이벤트 ${action === 'approve' ? '승인' : '거절'} 처리 완료`
      );
      fetchEvents(currentPage);
    } catch (error) {
      message.error('처리 중 오류 발생');
      console.error('액션 처리 오류:', error);
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div style={{ padding: '40px' }}>
      <h1>이벤트 관리</h1>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="월별 이벤트 개설 수">
            <EventsChart data={eventsChartData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="월별 이벤트 참가자 수">
            <ParticipantsChart data={participantsChartData} />
          </Card>
        </Col>
      </Row>
      <Card title="이벤트 목록" style={{ marginTop: '20px' }}>
        <EventsTable
          events={events}
          loading={loading}
          currentPage={currentPage}
          totalEvents={totalEvents}
          onPageChange={handlePageChange}
          onAction={handleAction}
        />
      </Card>
    </div>
  );
};

export default AdminEventsPage;
