import styled from 'styled-components';

export const AdminLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sider = styled.div`
  width: ${(props) => (props.collapsed ? '80px' : '200px')};
  background-color: #001529;
  transition: width 0.2s;
  position: fixed;
  top: 8vh; /* MainHeader height 고려 */
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

export const ContentLayout = styled.div`
  margin-left: ${(props) => (props.collapsed ? '80px' : '200px')};
  transition: margin-left 0.2s;
  width: 100%;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 8vh); /* MainHeader height 고려 */
`;

export const AdminHeader = styled.header`
  width: 100%;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 8vh; /* MainHeader height */
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

export const AdminTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #001529;
`;

export const AdminContent = styled.main`
  margin-top: 80px; /* AdminHeader height */
  padding: 20px;
  background-color: #f9f9f9;
  min-height: calc(
    100vh - 8vh - 60px
  ); /* 전체 높이에서 MainHeader와 AdminHeader를 뺀 값 */
`;

export const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #fff;
  margin-left: 10px;
`;
