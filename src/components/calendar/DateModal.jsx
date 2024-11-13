import React, { useState } from 'react';
import styled from 'styled-components';

const DateModal = ({ isOpen, onClose, date, events = [], onUpdateEvents }) => {
  const [showForm, setShowForm] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventContent, setEventContent] = useState('');

  if (!isOpen) return null;

  const handleAddEvent = () => {
    if (eventName && eventContent) {
      const newEvent = {
        name: eventName,
        content: eventContent
      };

      const updatedEvents = [...events, newEvent];
      onUpdateEvents(date.toDateString(), updatedEvents);

      setEventName('');
      setEventContent('');
      setShowForm(false);
    }
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    onUpdateEvents(date.toDateString(), updatedEvents);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {events.length > 0 && (
          <ModalEvent>
            <ModalEventList>날짜 : {date.toDateString()} </ModalEventList>
            <ModalEventList>장소 : </ModalEventList>
            <ModalEventList>인원 : </ModalEventList>
            <ModalEventList>시간 : </ModalEventList>
          </ModalEvent>
        )}
        <ModalToDoList>
          {events.map((event, index) => (
            <ModalList key={index}>
              <ModalListText>
                <h4>{event.name}</h4>
                <ModalListContent>{event.content}</ModalListContent>
              </ModalListText>
              <DeleteButton onClick={() => handleDeleteEvent(index)}>
                ×
              </DeleteButton>
            </ModalList>
          ))}
          {showForm && (
            <EventForm>
              <Input
                placeholder="event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <Input
                placeholder="event content"
                value={eventContent}
                onChange={(e) => setEventContent(e.target.value)}
              />
              <AddButton onClick={handleAddEvent}>Add Event</AddButton>
            </EventForm>
          )}
        </ModalToDoList>
        <Button>
          <ModalButton onClick={onClose}>Close</ModalButton>
          {events.length < 4 && (
            <PlusButton onClick={handleToggleForm}>⊕</PlusButton>
          )}
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DateModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 420px;
  height: 550px;
  background: #fcfcfa;
  color: #0056b3;
  padding: 20px;
  padding-bottom: 10px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const ModalEvent = styled.div`
  border: 1px solid gray;
`;

const ModalEventList = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ModalToDoList = styled.div`
  padding-top: 40px;
  padding-left: 3px;
  text-align: left;
  cursor: pointer;
  overflow-y: auto;
  flex: 1;
`;

const ModalList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
  font-size: 1rem;
`;

const ModalListText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalListContent = styled.div`
  font-size: 0.9rem;
`;

const DeleteButton = styled.button`
  margin-top: 4px;
  padding: 4px 8px;
  font-size: 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #e0edff;
    color: #0056b3;
    transition: 0.3s;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  margin-top: 25px;
  height: 50px;
`;

const ModalButton = styled.div`
  cursor: pointer;
  margin-top: 20px;
`;

const PlusButton = styled.div`
  cursor: pointer;
  font-size: 2rem;
`;

const EventForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 1rem;
`;

const AddButton = styled.button`
  padding: 8px;
  font-size: 1rem;
  cursor: pointer;
`;
