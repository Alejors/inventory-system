class UserDTO {
  constructor(username, email, password, role, companyId) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.companyId = companyId;
  }

  static fromObject(obj) {
    return new UserDTO(obj.username, obj.email, obj.password, obj.role, obj.companyId);
  }

}

module.exports = UserDTO;
