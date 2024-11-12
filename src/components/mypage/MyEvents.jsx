import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EventRequestForm from './EventRequestForm';
import EventCard from './EventCard';
import { fetchEvents } from '../../api/api';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchEvents(currentPage);
        setEvents(data.events);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <PageContainer>
      <Content>
        {events.length === 0 ? (
          <p>다가오는 이벤트가 없습니다</p>
        ) : (
          <>
            <Header>다가오는 이벤트</Header>
            {events.map((event) => (
              <EventCard
                key={event.id}
                name={event.name}
                date={event.date}
                location={event.location}
                participantCount={event.participantCount}
                signupDeadline={event.signupDeadline}
                status={event.status}
                imageUrl={event.imageUrl}
              />
            ))}
            <Pagination>
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>{currentPage}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </Pagination>
          </>
        )}
      </Content>
      <EventRequestForm />
    </PageContainer>
  );
};

// 스타일
const PageContainer = styled.div`
  display: flex;
  padding: 20px;
`;

const Header = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 8px;
  letter-spacing: 1px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;

  button {
    padding: 8px 12px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
      background-color: #ddd;
    }
  }
`;

export default MyEvents;
