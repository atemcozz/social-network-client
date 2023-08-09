import React, {useRef, useState} from 'react';
import Button from "../UI/Button/Button";
import Avatar from "../UI/Avatar/Avatar";
import {FaAngleDown} from "react-icons/fa";
import useOutsideClick from "../../hooks/useOutsideClick";
import Menu from "../UI/Menu/Menu";
import {BsFillPersonFill} from "react-icons/bs";
import {BsBookmarkFill} from "react-icons/bs";
import {FaSignOutAlt} from "react-icons/fa";
import {MdDarkMode} from "react-icons/md";
import Toggle from "../UI/Toggle/Toggle";
import useTheme from "../../hooks/useTheme";
import store from "../../store";
import {Link} from "react-router-dom";

const ProfileHeaderDropdown = ({user}) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();
  const themeToggleRef = useRef();
  const [theme, setTheme] = useTheme();
  useOutsideClick(ref, () => setDropdown(false));

  function handleThemeButton() {
    themeToggleRef.current.click();
  }

  if (!user) return null;
  return (
    <div ref={ref}>
      <Button variant={"secondary"} onClick={() => setDropdown(s => !s)}>
        <span className={"flex items-center gap-2"}>
          <Avatar size={"small"} src={user.avatar_url}/>
          <span>{user.nickname}</span>
          <FaAngleDown size={"16px"}/>
        </span>
      </Button>
      <Menu active={dropdown}>
        <Link to={`/user/${user?.id}`}>
          <Menu.Item>
            <BsFillPersonFill size={"32px"}/> Профиль
          </Menu.Item>
        </Link>
        <Link to={`/saved`}>
          <Menu.Item>
            <BsBookmarkFill size={"32px"}/> Закладки
          </Menu.Item>
        </Link>
        <Menu.Item onClick={handleThemeButton}>
          <MdDarkMode size={"32px"}/>
          Тёмная тема
          <Toggle
            ref={themeToggleRef}
            active={theme === "theme-dark"}
            onChange={(enabled) => {
              setTheme(enabled ? "theme-dark" : "theme-light");
            }}
          />
        </Menu.Item>
        <Menu.Item onClick={() => store.logout()}>
          <FaSignOutAlt size={"32px"}/> Выйти
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default ProfileHeaderDropdown;