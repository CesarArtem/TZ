import React from 'react';
import './sidemenu.css';

const SideMenu = () => {
    return (
        <div className="side-menu">
            <ul>
                <li><a>Таблицы</a></li>
                <li><a>Другой пункт</a></li>
                <li><a>Еще один пункт</a></li>
            </ul>
        </div>
    );
};

export default SideMenu;