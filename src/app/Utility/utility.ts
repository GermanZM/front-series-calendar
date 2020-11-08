export class Utility {

  // Check if a string value is empty
  checkIsEmpty(pValue: string): boolean {
      return pValue === '' ? true : false;
  }

  // Check if any value is null
  checkIsNull(pValue: any): boolean {
      return pValue == null ? true : false;
  }

  public checkUser(username: string, password: string): string {

    if ((this.checkIsNull(username) || this.checkIsEmpty(username)) &&
        (this.checkIsNull(password) || this.checkIsEmpty(password))) {
        return 'Campos usuario y contraseña son obligatorios';
    } else if (this.checkIsNull(username) || this.checkIsEmpty(username)) {
      return 'Campo usuario obligatorio';
    } else if (this.checkIsNull(password) || this.checkIsEmpty(password)) {
      return 'Campo contraseña obligatorio';
    }

    return '';

  }

}
