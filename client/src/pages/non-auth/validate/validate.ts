class Validate {
  static email = {
    required: (e: string) => {
      if (e) {
        return true;
      }
      return 'Please enter your email';
    },
    pattern: (e: string) => {
      if (e.length > 5 && e.includes('@') && e.includes('.')) {
        return true;
      }
      return 'This email is not valid';
    },
  };

  static password = {
    required: (e: string) => {
      if (e) {
        return true;
      }
      return 'Please enter your password';
    },
    pattern: (e: string) => {
      if (e.length > 8) {
        return true;
      }
      return 'Please enter a password having at least 9 characters';
    },
  };

  static confirmPassword = {
    required: (e: string | undefined) => {
      if (e) {
        return true;
      }
      return 'Please enter confirm password';
    },
  };

  static username = {
    required: (e: string | undefined) => {
      if (e) {
        return true;
      }
      return 'Please enter user name';
    },
  };
}

export default Validate;
