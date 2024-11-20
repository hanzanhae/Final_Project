import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColorPage};
  min-height: 100vh;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;
export const Container = styled.div`
  width: fit-content;
  height: fit-content;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const MapTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
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
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #0078d4, #005a9e);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
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

    @media (max-width: 1440px) {
      font-size: 0.8rem;
    }
  }
`;

export const MapWrapper = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: row;
  gap: 0.5vw;
`;
export const MapContainer = styled.div`
  width: 60vw;
  height: 100%;
  border-radius: 15px;
  box-shadow: 0 0 10px 1px #ececec;
  overflow: hidden;
`;
