const paths = {
  trips: '/trips',
  faculties: '/faculties',
  students: '/students',
  districts: '/districts',
  beacons: '/beacons',
  messages: '/messages',
  schools: '/schools',
};

export const RoutePaths = {
  faculties: {
    list: () => paths.faculties,
    create: () => `${paths.faculties}/create`,
    detail: id => `${paths.faculties}/${id}`,
    update: id => `${paths.faculties}/${id}/update`,
  },
  trips: {
    list: () => paths.trips,
    create: () => `${paths.trips}/create`,
    update: id => `${paths.trips}/${id}/update`,
  },
  students: {
    list: () => paths.students,
    create: () => `${paths.students}/create`,
    update: id => `${paths.students}/${id}/update`,
    details: id => `${paths.students}/${id}`,
  },
  districts: {
    list: () => paths.districts,
    create: () => `${paths.districts}/create`,
    detail: id => `${paths.districts}/${id}`,
    update: id => `${paths.districts}/${id}/update`,
  },
  beacons: {
    list: () => paths.beacons,
    create: () => `${paths.beacons}/create`,
    update: id => `${paths.beacons}/${id}/update`,
    detail: id => `${paths.beacons}/${id}`,
  },
  messages: {
    list: () => paths.messages,
    create: () => `${paths.messages}/create`,
    update: id => `${paths.messages}/${id}/update`,
    detail: id => `${paths.messages}/${id}`,
  },
  schools: {
    list: () => paths.schools,
    details: id => `${paths.schools}/${id}`,
    create: () => `${paths.schools}/create`,
    update: id => `${paths.schools}/${id}/update`,
  },
};
