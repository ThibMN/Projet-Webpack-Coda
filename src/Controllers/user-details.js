const ControllerUserDetails = class ControllerUserDetails {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.userId = params.id;
    this.users = JSON.parse(localStorage.getItem('users')) || []; // Récupère la liste des utilisateurs
    this.user = this.users.find((u) => u.login.uuid === this.userId);
    this.run();
  }

  render() {
    if (!this.user) {
      return `
        <div class="container">
          <h1>User Not Found</h1>
          <a href="#/list-users" class="btn btn-primary">Back to Users</a>
        </div>
      `;
    }

    const {
      name, picture, email, phone, location
    } = this.user;
    return `
      <div class="container">
        <h1>${name.first} ${name.last}</h1>
        <img src="${picture.large}" alt="${name.first}" class="rounded-circle">
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Location: ${location.city}, ${location.country}</p>
        <a href="#/list-users" class="btn btn-primary">Back to Users</a>
      </div>
    `;
  }

  run() {
    this.el.innerHTML = this.render();
  }
};

export default ControllerUserDetails;
