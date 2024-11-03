import { Link, useLocation } from 'react-router-dom';

const emojis = ['❤', '🚀', '🔥', '🌟', '👋', '🍉', '🍓', '🍒']
const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

const navigation = [
  { name: 'Inicio', href: randomEmoji },
  { name: 'E-commerce', href: '/industry/ecommerce' },
  { name: 'Salud', href: '/industry/healthcare' },
  { name: 'Marketing', href: '/industry/marketing' },
];

export function Navigation({ mobile }: { mobile?: boolean }) {
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