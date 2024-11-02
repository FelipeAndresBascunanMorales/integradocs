import React from 'react';

const RouterContext = React.createContext<{
  path: string;
  navigate: (to: string) => void;
}>({
  path: window.location.pathname,
  navigate: () => {},
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = React.useState(window.location.pathname);

  const navigate = React.useCallback((to: string) => {
    window.history.pushState({}, '', to);
    setPath(to);
  }, []);

  React.useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Link({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { navigate } = React.useContext(RouterContext);

  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

export function Routes({ children }: { children: React.ReactNode }) {
  const { path } = React.useContext(RouterContext);
  const routes = React.Children.toArray(children) as React.ReactElement[];
  const route = routes.find((route) => {
    const pattern = new RegExp(
      '^' + route.props.path.replace(/:[^\s/]+/g, '([^/]+)') + '$'
    );
    return pattern.test(path);
  });

  return route ? route.props.element : null;
}

export function Route({
  path,
  element,
}: {
  path: string;
  element: React.ReactElement;
}) {
  return element;
}

export function useLocation() {
  const { path } = React.useContext(RouterContext);
  return { pathname: path };
}

export function useParams<T extends Record<string, string>>(): T {
  const { path } = React.useContext(RouterContext);
  const routes = document.querySelectorAll('route');
  const params: Record<string, string> = {};

  routes.forEach((route) => {
    const routePath = route.getAttribute('path') || '';
    const pattern = new RegExp(
      '^' + routePath.replace(/:[^\s/]+/g, '([^/]+)') + '$'
    );
    const matches = path.match(pattern);

    if (matches) {
      const paramNames = (routePath.match(/:[^\s/]+/g) || []).map((param) =>
        param.slice(1)
      );
      paramNames.forEach((name, index) => {
        params[name] = matches[index + 1];
      });
    }
  });

  return params as T;
}