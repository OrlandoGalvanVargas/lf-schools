import { useLocation, useNavigate } from 'react-router-dom';

const toSingular = module => (module.endsWith('s') ? module.slice(0, -1) : module);

const defaultTemplate = {
  list: {
    title: module => module,
    description: module => `${module} Management`,
    showBack: false,
  },
  create: {
    title: module => `Add ${toSingular(module)}`,
    description: module => `Create a new ${toSingular(module).toLowerCase()}`,
    showBack: true,
  },
  detail: {
    title: module => `${toSingular(module)} Details`,
    description: (module, id) => `Viewing ${toSingular(module).toLowerCase()} #${id}`,
    showBack: true,
  },
  update: {
    title: module => `Edit ${toSingular(module)}`,
    description: (module, id) => `Editing ${toSingular(module).toLowerCase()} #${id}`,
    showBack: true,
  },
};

const customRouteHeader = {
  // '/districts': {
  //   title: 'Districts',
  //   showBack: false,
  // },
};

export const useRouteHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const parseRoute = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return null;

    const moduleSlug = parts[0];
    const moduleName = moduleSlug.charAt(0).toUpperCase() + moduleSlug.slice(1);

    let viewType = 'list';
    let id = null;

    if (parts.includes('create')) viewType = 'create';
    else if (parts.includes('update')) {
      viewType = 'update';
      id = parts[1];
    } else if (parts.length === 2) {
      viewType = 'detail';
      id = parts[1];
    }

    return { module: moduleName, viewType, basePath: `/${moduleSlug}`, id };
  };

  const routeInfo = parseRoute();

  if (!routeInfo) {
    return { title: '', description: '', showBack: false, onBack: null };
  }

  const { module, viewType, basePath, id } = routeInfo;

  const customConfig = customRouteHeader[location.pathname];
  if (customConfig) {
    const backTo =
      typeof customConfig.backTo === 'function' ? customConfig.backTo(id) : customConfig.backTo;

    return {
      title: customConfig.title,
      description:
        typeof customConfig.description === 'function'
          ? customConfig.description(id)
          : customConfig.description,
      showBack: customConfig.showBack,
      onBack: backTo ? () => navigate(backTo) : null,
    };
  }

  const template = defaultTemplate[viewType];

  const title = template.title(module);
  const description = template.description(module, id);

  const backTo = template.showBack ? basePath : null;

  return {
    title,
    description,
    showBack: template.showBack,
    onBack: backTo ? () => navigate(backTo) : null,
  };
};
