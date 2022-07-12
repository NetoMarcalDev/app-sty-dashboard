import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { getTopNav } from '../../data/navbars';

const Menu = () => {

    const [navItems, setNavItems] = useState([]);
    const [collapse, setCollapse] = useState("nav__menu");
    const [toggleIcon, setToggleIcon] = useState("toggler__icon");

    useEffect(()=>{
        setNavItems(getTopNav());
    }, [])


     const onToggle = () => {
        collapse === "nav__menu"
            ? setCollapse("nav__menu nav__collapse")
            : setCollapse("nav__menu");

        toggleIcon === "toggler__icon"
            ? setToggleIcon("toggler__icon toggle")
            : setToggleIcon("toggler__icon");
    };

    return(
        <div className="nav__wrapper">
            <div className="container">
              <nav className="nav">
                <Link to="#" className="nav__brand" style={{ color: '#fff', textDecoration: 'none'}}>
                <img src="http://setydeias.com.br/wp-content/uploads/2020/02/Nome-da-Logo-1-1.png" width="200" height="40" alt="" loading="lazy" />
                </Link>
                <ul className={collapse}>
                  {navItems.map((item) => (
                    <li key={item.id} className="nav__item">
                      <Link to={item.href} className="nav__link" style={{ color: '#fff', textDecoration: 'none'}}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className={toggleIcon} onClick={onToggle}>
                  <div className="line__1"></div>
                  <div className="line__2"></div>
                  <div className="line__3"></div>
                </div>
              </nav>
            </div>
        </div>
    )
}

export default Menu;