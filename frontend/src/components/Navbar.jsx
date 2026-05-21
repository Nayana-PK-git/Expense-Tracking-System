import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Nav = styled.nav`
    background: #2563eb;
    color: #fff;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const Logo = styled(Link)`
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;


    &:hover{
        opacity: 0.9;
    }
`

const NavRight =styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`

const LogoutBtn = styled.button`
    background: rgba(255,255,255,0.2);
    border: none;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    font-size: 0.9rem;
    transition: background 0.2s;

    &:hover{
        background: rgba(255,255,255,0.3);
    }
`


function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate()

    const handleLogout = async() => {
        await logout();
        navigate('/login')
    }

    return(
        <Nav>
            <Logo to="/">ExpenseTracker</Logo>
            {user && (
                <NavRight>
                    <userName>Hi, {user.name}</userName>
                    <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
                </NavRight>
            )}
        </Nav>
    )
}

export default Navbar