import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Ver Todo', href: '/all' },
  { name: 'Especialistas', href: '/specialists' },
  { name: 'Admin', href: '/admin' },
];

export function Navigation({ mobile }: { mobile?: boolean }) {
  const emojis = ['❤', '🚀', '🔥', '🌟', '👋', '🍉', '🍓', '🍒']
  const [randomEmoji, setRandomEmoji] = useState(emojis[Math.floor(Math.random() * emojis.length)])
  
  useEffect(() => {
    const newEmoji = emojis[Math.floor(Math.random() * emojis.length)]
    setRandomEmoji(newEmoji)
    document.title = `veelotu.cl - ${randomEmoji}`
    return () => {
      document.title = 'veelotu.cl'
    }
  })


  const location = useLocation();

  const baseClasses = mobile
    ? 'block px-3 py-2 text-base font-medium rounded-md'
    : 'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2';

  const activeClasses = mobile
    ? 'bg-indigo-50 text-indigo-700'
    : 'border-indigo-500 text-gray-900';

  const inactiveClasses = mobile
    ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700';

  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`${baseClasses} ${
            location.pathname === item.href ? activeClasses : inactiveClasses
          }`}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}