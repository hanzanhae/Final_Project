import styled from 'styled-components';

export const AdminLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sider = styled.div`
  width: 200px;
  background-color: #001529;
  position: fixed;
  top: 8vh;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

export const ContentLayout = styled.div`
  margin-left: 200px;
  width: 100%;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 8vh);
`;

export const MenuWrapper = styled.div`
  border-right: 0;
  background-color: inherit;
  color: #fff;
`;

export const AdminHeader = styled.header`
  width: 100%;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 8vh;
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
  margin-top: 80px;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: calc(100vh - 8vh - 60px);
`;
