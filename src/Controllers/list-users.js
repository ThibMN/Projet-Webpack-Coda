import axios from 'axios';
import ViewNav from '../Views/nav';
import ViewUsers from '../Views/users';

const ListUsers = class ListUsers {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.params = params;
    this.users = [];
    this.filteredUsers = [];
    this.run();
  }

  render() {
    return `
      ${ViewNav()}
      <div class="container-fluid">
        ${ViewUsers(this.filteredUsers)}
      </div>
    `;
  }

  addEventListeners() {
    document.querySelectorAll('.btn-get-info').forEach((button, index) => {
      button.addEventListener('click', () => {
        const user = this.filteredUsers[index];
        window.location.hash = `#/user/${user.login.uuid}`;
      });
    });

    const searchInput = document.querySelector('#search-input');
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      this.filteredUsers = this.users.filter((user) => `${user.name.first} ${user.name.last}`.toLowerCase().startsWith(searchTerm));
      this.el.innerHTML = this.render();
      this.addEventListeners();
    });
  }

  run() {
    axios
      .get('https://randomuser.me/api/', { params: { results: this.params.results } })
      .then((res) => {
        const { data } = res;
        this.users = data.results;
        this.filteredUsers = [...this.users]; // Copie initiale

        // Stocke les utilisateurs dans le localStorage
        localStorage.setItem('users', JSON.stringify(this.users));

        this.el.innerHTML = this.render();
        this.addEventListeners();
      })
      .catch(() => {
        this.el.innerHTML = '<p class="text-danger">Failed to load users.</p>';
      });
  }
};

export default ListUsers;
