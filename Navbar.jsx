import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'boxicons'
import { useAppContext } from '../Context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { DarkMode, setDarkMode, user, setUser } = useAppContext()


  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);




  const language = [
    { name: "O'zbekcha", code: 'uz' },
    { name: 'Русский', code: 'ru' },
    { name: 'English', code: 'en' },
  ];

  const HeadElements = [
    { title: 'uzd/usd', icon: 'wallet', id: 1 },
    { title: 'Сравнение', icon: 'slider-alt', navigate: '/compare', id: 2 },
    { title: 'Избранное', icon: 'heart', navigate: '/favorites', id: 3 },
    { title: 'Корзина', icon: 'cart', navigate: '/cart', id: 4 },
    { title: 'Контакты', icon: 'phone', navigate: '/contacts', id: 5 },
  ];

  const menuItems = [
    { title: 'Каталог', icon: 'grid-alt', active: true, link: '/catalog' },
    { title: 'Конфигуратор', icon: 'cog', active: false, link: '/configurator' },
    { title: 'Купить компьютер', icon: 'desktop', active: false, link: '/buy-computer' },
    { title: 'Новинки', active: false, link: '/new' },
    { title: 'HyperX', underline: true, link: '/hyperx' },
    { title: 'Все бренды', underline: true, link: '/brands' },
  ];



  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(prev => !prev);


  return (
    <>
      <header id='header' className={`fixed top-0 left-0 w-[100%] h-20 z-50 transition-transform duration-300 flex items-center justify-center m-auto ${show ? "translate-y-0" : "-translate-y-full"}`}>
          <div className="w-[90%] m-auto flex items-center justify-between max-w-[1400px] h-15 gap-8">
            <div className="flex-1">
              <Link to={'/'}>
                {DarkMode ? (<img className='w-[200px]' src="https://files.ox-sys.com/cache/original/image/81/b3/7f/81b37f227eb3aa9ee19bf9614075ecbfeaf7fa94a0d02e463cd9d4a8cdb5863c.png" alt="" />) : (<img className='w-[200px]' src="https://files.ox-sys.com/cache/original/image/83/42/50/8342504bbf1b88f7a8e05dd42a7f5b551d99b8bd1e8c0e16fef225962385f14e.png" alt="" />)}
              </Link>
            </div>
            <div className="flex-2 flex items-center justify-start">
              <form action="" className='w-90 group'>
                <div className="w-[100%] border rounded-sm flex items-center justify-start h-9 p-2">
                  <input type="search" placeholder='Search...' className='w-full h-full outline-0 text-[#FF0096]' />
                  <div className="h-full flex items-center ">
                    <box-icon name="search" className="group-hover:rotate-90 transition-[0.3s]" color={DarkMode ? 'white' : 'black'}></box-icon>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex flex-2 items-center justify-end gap-3">
              {HeadElements.map(item => (
                <Link key={item.id} to={item.navigate || '#'}>
                  <div className="flex flex-col items-center group transition">
                    <box-icon
                      name={item.icon}
                      color={DarkMode ? 'white' : 'black'}
                      className="transition-transform group-hover:-translate-y-1"
                    ></box-icon>
                    <span className="group-hover:text-[#FF0096] transition">{item.title}</span>
                  </div>
                </Link>
              ))}
              <div className='flex items-center justify-center'>
                <button className='flex items-center justify-center h-full ' onClick={() => setDarkMode(!DarkMode)}>
                  {DarkMode ? (<box-icon name="sun" color="#fff" className='hover:rotate-90 transition-[0.3s]' size='30px'></box-icon>) : (<box-icon name="moon" className='hover:rotate-280 transition-[0.3s]' size='30px'></box-icon>)}
                </button>
              </div>
              {!user ? (
                <Link to="/login" className="flex items-center group">
                  <h1>Login</h1>
                  <box-icon
                    name="user"
                    size="30px"
                    className="group-hover:rotate-90 transition-[0.3s]"
                    color={DarkMode ? 'white' : 'black'}
                  ></box-icon>
                </Link>
              ) : (
                <Link to='/profil' className="flex items-center justify-end gap-1">
                  <h1>salom</h1>
                  {
                    DarkMode ? (<box-icon name='user-circle' type='solid' color='white' size='40px'></box-icon>) : (<box-icon name='user-circle' type='solid' size='40px'></box-icon>)
                  }
                </Link>
              )

              }
            </div>
          </div>
      </header>
      <div className={`${DarkMode ? 'bg-black' : 'bg-white'} flex items-center justify-center py-2 max-w-[1400px] m-auto`}>
        <div id='top-bar' className={`flex gap-4 items-center justifey-start py-3 w-[100%] h-[100%] mt-20`}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link;

            return (
              <Link key={index} to={item.link}>
                <div
                  className={`flex items-center gap-2 py-2 rounded relative justifey-start
                     ${isActive ? 'bg-[#FF0096] text-white' : DarkMode ? 'text-white' : 'text-black'}
                    hover:text-[#FF0096] transition`} >
                  {item.icon && (
                    <box-icon
                      name={item.icon}
                      color={isActive ? 'white' : '#FF0096'}
                    ></box-icon>
                  )}
                  <span className="text-sm font-medium">{item.title}</span>

                  {item.underline && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF0096] rounded"></span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
