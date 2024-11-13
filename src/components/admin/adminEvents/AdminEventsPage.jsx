import React, { useEffect, useState } from 'react';
import { Card, Row, Col, message } from 'antd';
import axios from '../../../api/instance';
import EventsTable from './EventTable';
import EventsPagination from './EventsPagination';
import EventsChart from './EventsChart';
import ParticipantsChart from './ParticipantsChart';

const AdminEventsPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalEvents, setTotalEvents] = useState(0);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);

  const [eventsChartData, setEventsChartData] = useState([]);
  const [participantsChartData, setParticipantsChartData] = useState([]);

  const preprocessMonthlyData = (data) => {
    const monthlyData = Array.isArray(data) ? data : [];
    const monthlyCounts = monthlyData.reduce((acc, item) => {
      const month = `${parseInt(item.month.split('-')[1], 10)}월`;
      acc[month] = (acc[month] || 0) + item.count;
      return acc;
    }, {});
    return {
      labels: Object.keys(monthlyCounts),
      values: Object.values(monthlyCounts)
    };
  };

  const fetchEvents = async (page = 0, size = 5) => {
    setLoading(true);
    try {
      console.log(`Fetching events for page: ${page}, size: ${size}`); // 콘솔 로그 추가
      const response = await axios.get('/admin/events', {
        params: { page, size, sort: 'created_at,desc' }
      });

      console.log('Fetched data:', response.data); // 데이터 확인
      setEventsData(response.data.content);
      setTotalEvents(
        response.data.pageable.totalElements ||
          response.data.totalElements ||
          response.data.total
      ); // 가능성 있는 대체 항목 추가

      setPageNumber(response.data.number);
      setPageSize(response.data.size);
      setFirst(response.data.first);
      setLast(response.data.last);

      console.log(
        'Page info - First:',
        response.data.first,
        'Last:',
        response.data.last
      );
      console.log(
        'Total elements:',
        response.data.totalElements,
        'Page number:',
        response.data.number
      );
    } catch (error) {
      console.error('이벤트 데이터를 불러오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventsChartData = async () => {
    try {
      const response = await axios.get(
        '/admin/events/events_per_month?eventCount=EVENTS_PER_MONTH'
      );
      setEventsChartData(preprocessMonthlyData(response.data));
    } catch (error) {
      console.error('월별 이벤트 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  const fetchParticipantsChartData = async () => {
    try {
      const response = await axios.get(
        '/admin/events/events_per_month?eventCount=EVENT_PARTICIPANTS_PER_MONTH'
      );
      setParticipantsChartData(preprocessMonthlyData(response.data));
    } catch (error) {
      console.error('참가자 차트 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchEventsChartData();
    fetchParticipantsChartData();
  }, []);

  const handlePageChange = (newPageNumber) => {
    console.log(`Requested page change to: ${newPageNumber + 1}`); // 페이지 변경 요청 시 콘솔 로그 추가
    if (newPageNumber >= 0) {
      fetchEvents(newPageNumber);
    }
  };

  const handleEventAction = async (eventId, action, email, reason) => {
    try {
      await axios.patch(`/admin/admin/events/${eventId}`, {
        status: action,
        email: email,
        report_reason: reason || '해당 없음'
      });
      message.success(
        `이벤트가 ${action === 'APPROVED' ? '승인' : '거절'}되었습니다.`
      );
      fetchEvents(pageNumber);
    } catch (error) {
      console.error(`이벤트 ${action} 중 오류 발생:`, error);
      message.error(
        `이벤트 ${action === 'APPROVED' ? '승인' : '거절'}에 실패했습니다.`
      );
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>이벤트 승인 대기 목록</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="월별 이벤트 개설 수">
            <EventsChart data={eventsChartData} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="월별 이벤트 참가자 수">
            <ParticipantsChart data={participantsChartData} />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: '20px' }}>
        <EventsTable
          data={eventsData}
          loading={loading}
          onApprove={(eventId, email) =>
            handleEventAction(eventId, 'APPROVED', email)
          }
          onReject={(eventId, email, reason) =>
            handleEventAction(eventId, 'REJECTED', email, reason)
          }
        />
        <EventsPagination
          currentPage={pageNumber + 1}
          totalEvents={totalEvents}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          first={first}
          last={last}
        />
      </Card>
    </div>
  );
};

export default AdminEventsPage;
