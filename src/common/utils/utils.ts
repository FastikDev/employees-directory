import moment from 'moment';

export const getAge = (birthDate: number) => {
  const birthDateMoment = moment.unix(birthDate / 1000);
  const age = moment().diff(birthDateMoment, 'years');
  return age;
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

export const groupWorkers = (sortWorkers: Worker[], sorting: 'alphabet' | 'birthday') => {
  if (sorting === 'alphabet') {
    return { '': sortWorkers };
  }

  return sortWorkers.reduce<Record<string, Worker[]>>((acc, worker) => {
    const year = moment(worker.birthDate).format('YYYY');

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push(worker);

    return acc;
  }, {});
};
