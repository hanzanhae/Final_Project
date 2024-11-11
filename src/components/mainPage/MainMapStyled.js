import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: ${({ theme }) => theme.bgColorPage};
  min-height: 100vh;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Controls = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;

  label {
    display: flex;
    align-items: center;
  }

  button {
    padding: 10px 20px;
    background: linear-gradient(135deg, #0078d4, #005a9e);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #005a9e, #0078d4);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
      transform: translateY(-2px);
    }

    &:active {
      background: linear-gradient(135deg, #00427a, #005a9e);
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(0px);
    }
  }
`;

export const MapContainer = styled.div`
  width: 150vh;
  height: 70vh;

  border-radius: 15px;
  box-shadow: 0 0 10px 1px #ececec;
  overflow: hidden;
`;
