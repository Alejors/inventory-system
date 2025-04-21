class UserDTO {
  constructor(username, email, password, role) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static fromObject(obj) {
    return new UserDTO(obj.username, obj.email, obj.password, obj.role);
  }
  
}

module.exports = UserDTO;
