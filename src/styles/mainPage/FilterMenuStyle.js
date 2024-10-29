import styled from 'styled-components';
import { BlueBtn } from '../../components/button/UniBtn';

export const FilterMenuWrapper = styled.div`
  width: 100%;
  height: 8vh;
  padding: 0 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #ececec;
`;

export const FilterBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const FilterReset = styled.button`
  font-weight: 600;
  color: #555;
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
  }
`;

export const FilterTitle = styled.h3`
  font-size: 1rem;
  line-height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const SeletedFilter = styled.span`
  width: 80px;
  height: 28px;
  text-align: center;
  background-color: ${({ theme }) => theme.pointColorLight};
  font-weight: 600;
  font-size: 0.8rem;
  border-radius: 1rem;
`;

export const UlContainer = styled.div`
  margin-top: 0.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1.2rem;
  border: 1px solid ${({ theme }) => theme.pointColorLight};
  position: absolute;
  top: 1.8rem;
  left: -2rem;
  z-index: 999;
`;
export const CloseBtn = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
export const ContainerInner = styled.div``;

export const UlTitle = styled.h4`
  font-size: 0.9rem;
`;
export const Ul = styled.ul`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const Li = styled.li`
  width: 100px;
  padding: 0.5rem;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8rem;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.pointColorLight : '#efefef'};
  &:hover {
    background-color: ${({ theme }) => theme.pointColorLight};
  }
`;
export const FilterBtn = styled(BlueBtn)`
  float: right;
  margin-top: 1rem;
  padding: 0.25rem 0.5rem;
`;

export const SearchBox = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const SearchInput = styled.input`
  padding: 0.25rem 0.5rem;
  border: 1.2px solid #ccc;
  border-radius: 0.25rem;
`;
export const SearchBtn = styled.button``;
export const BtnIcon = styled.img`
  width: 1.2rem;
`;
