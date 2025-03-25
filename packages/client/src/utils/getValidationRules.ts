export const getValidationRules = (field: string): [RegExp, string] => {
  const rules: { [key: string]: [RegExp, string] } = {
    first_name: [
      /^[A-Za-zА-Яа-яЁё]{1}[A-Za-zА-Яа-яЁё-]+$/,
      'name must start with a capital letter, without spaces or digits',
    ],
    second_name: [
      /^[A-Za-zА-Яа-яЁё]{1}[A-Za-zА-Яа-яЁё-]+$/,
      'name must start with a capital letter, without spaces or digits',
    ],
    login: [
      /^[A-Za-z][A-Za-z0-9_-]{2,19}$/,
      'username must contain 3-20 chars, only latin letters, digits, hyphens, or underscores',
    ],
    email: [
      /^[A-Za-z0-9_-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'email must contain "@", and the domain must consist of at least two letters',
    ],
    password: [
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      'password must contain 8-40 chars, one uppercase letter, and a digit.',
    ],
    password_again: [
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      'password must contain 8-40 chars, one uppercase letter, and a digit.',
    ],
    phone: [
      /^\+?[0-9]{10,15}$/,
      'phone number must contain 10-15 chars, using only digits.',
    ],
  }

  return rules[field]
}
