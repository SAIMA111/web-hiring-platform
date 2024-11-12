import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaHome, FaClipboardList, FaTasks } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 200px; /* Reduced size for a more compact sidebar */
  height: 100vh;
  background: linear-gradient(145deg, #4e54c8, #8f94fb);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 999;

  @media (min-width: 768px) {
    transform: translateX(0); /* Sidebar is always visible on larger screens */
    width: 250px; /* Slightly larger width for larger screens */
  }
`;

const SidebarLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin: 10px 0;
  padding: 8px 15px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  gap: 10px;
  transition: all 0.3s ease-in-out;

  &.active {
    background-color: #1abc9c;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 14px; /* Reduced font size for smaller screens */
    padding: 8px 10px;
  }
`;

const MenuButton = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #4e54c8;
  color: white;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    display: none; /* Hide menu button on larger screens */
  }

  &:hover {
    background-color: #8f94fb;
  }
`;

const ContainerLink = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-top: 20px; /* Adjust spacing for smaller screens */
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuButton onClick={toggleSidebar}>
        <FaBars />
      </MenuButton>
      <SidebarContainer isOpen={isOpen}>
        <ContainerLink>
          <SidebarLink exact to="/" activeClassName="active">
            <FaHome />
            Dashboard
          </SidebarLink>
          <SidebarLink to="/jobposting" activeClassName="active">
            <FaClipboardList />
            Job Postings
          </SidebarLink>
          <SidebarLink to="/create-assessment" activeClassName="active">
            <FaTasks />
            Assessments
          </SidebarLink>
        </ContainerLink>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
