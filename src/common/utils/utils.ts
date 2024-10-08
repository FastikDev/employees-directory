import moment from 'moment';

export const getAge = (birthDate: string) => {
  const birthDateMoment = moment(birthDate);
  const age = moment().diff(birthDateMoment, 'years');
  return age;
};

export const getBirthDate = (birthDate: string) => {
  const birthDateMoment = moment(birthDate).format('D MMMM YYYY');

  return birthDateMoment;
};

type Worker = {
  name: string;
  email: string;
  position: string;
  tag: string;
  birthDate: string;
  sortWorkers?: void;
};

export const getEmployees = (
  employees: Worker[],
  sorting: 'alphabet' | 'birthday',
  position?: string,
  searchValue?: string,
): Worker[] => {
  const filteredEmployees = employees.reduce<Worker[]>((acc, worker) => {
    const isPositionMatch = position
      ? position === 'all' || worker.position.toLowerCase() === position.toLowerCase()
      : true;

    const isSearchMatch = searchValue
      ? [worker.name, worker.tag, worker.email].some(value =>
          value.toLowerCase().includes(searchValue.toLowerCase()),
        )
      : true;

    if (isPositionMatch && isSearchMatch) {
      acc.push(worker);
    }

    return acc;
  }, []);

  const compareWorkers = (a: Worker, b: Worker): number => {
    return sorting === 'alphabet'
      ? a.name.localeCompare(b.name)
      : moment(a.birthDate).diff(moment(b.birthDate));
  };

  return filteredEmployees.sort(compareWorkers);
};

export const groupWorkers = (sortedWorkers: Worker[], sorting: 'alphabet' | 'birthday') => {
  if (sorting === 'alphabet') {
    return { '': sortedWorkers };
  }

  return sortedWorkers.reduce<Record<string, Worker[]>>((acc, worker) => {
    const year = moment(worker.birthDate).format('YYYY');

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push(worker);

    return acc;
  }, {} as Record<string, Worker[]>);
};
