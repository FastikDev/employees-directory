import moment from 'moment';

export const getAge = (birthDate: string) => {
  const birthDateMoment = moment(birthDate);
  return moment().diff(birthDateMoment, 'years');
};

export const getBirthDate = (birthDate: string) => {
  return moment(birthDate).format('D MMMM YYYY');
};

type Employee = {
  name: string;
  email: string;
  position: string;
  tag: string;
  birthDate: string;
  isFavorite: boolean;
  sortEmploees?: void;
};

export const getEmployees = (
  employees: Employee[],
  sorting: 'alphabet' | 'birthday',
  position?: string,
  searchValue?: string,
): Employee[] => {
  const filteredEmployees = employees.reduce<Employee[]>((acc, employee) => {
    const isPositionMatch =
      position === 'favorite'
        ? employee.isFavorite
        : position
        ? position === 'all' || employee.position.toLowerCase() === position.toLowerCase()
        : true;

    const isSearchMatch = searchValue
      ? [employee.name, employee.tag, employee.email].some(value =>
          value.toLowerCase().includes(searchValue.toLowerCase()),
        )
      : true;

    if (isPositionMatch && isSearchMatch) {
      acc.push(employee);
    }

    return acc;
  }, []);

  const compareEmployees = (a: Employee, b: Employee): number => {
    return sorting === 'alphabet'
      ? a.name.localeCompare(b.name)
      : moment(a.birthDate).diff(moment(b.birthDate));
  };

  return filteredEmployees.sort(compareEmployees);
};

export const groupedEmployees = (sortedEmployees: Employee[], sorting: 'alphabet' | 'birthday') => {
  if (sorting === 'alphabet') {
    return { '': sortedEmployees };
  }

  return sortedEmployees.reduce<Record<string, Employee[]>>((acc, employee) => {
    const year = moment(employee.birthDate).format('YYYY');

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push(employee);

    return acc;
  }, {});
};
