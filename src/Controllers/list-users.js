import axios from 'axios';
import ViewNav from '../Views/nav';
import ViewUsers from '../Views/users';

const ListUsers = class ListUsers {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.params = params;
    this.users = [];
    this.filteredUsers = [];
    this.isInitialized = false;
    this.initUsers();
  }

  render() {
    return `
      ${ViewNav()}
      <div class="container-fluid">
        ${ViewUsers(this.filteredUsers)}
      </div>
    `;
  }

  initUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      this.filteredUsers = [...this.users];
      this.el.innerHTML = this.render();
      this.addEventListeners();
    } else {
      this.fetchUsers();
    }
  }

  addEventListeners() {
    document.querySelectorAll('.btn-get-info').forEach((button, index) => {
      button.addEventListener('click', () => {
        const user = this.filteredUsers[index];
        window.location.hash = `#/user/${user.login.uuid}`;
      });
    });
    const searchInput = document.querySelector('#search-input');
    let searchTerm = '';
    let searchTimeout;
    const performSearch = () => {
      this.filteredUsers = this.users.filter((user) => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase())
        || user.name.first.toLowerCase().includes(searchTerm.toLowerCase())
        || user.name.last.toLowerCase().includes(searchTerm.toLowerCase());
      });
      this.el.innerHTML = this.render();
      this.addEventListeners();
      const newSearchInput = document.querySelector('#search-input');
      newSearchInput.value = searchTerm;
      newSearchInput.focus();
    };
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(performSearch, 500);
    });
  }

  fetchUsers() {
    axios
      .get('https://randomuser.me/api/', {
        params: {
          results: 50
        }
      })
      .then((res) => {
        const { data } = res;
        this.users = data.results;
        this.filteredUsers = [...this.users];
        localStorage.setItem('users', JSON.stringify(this.users));
        this.isInitialized = true;
        this.el.innerHTML = this.render();
        this.addEventListeners();
      })
      .catch(() => {
        this.el.innerHTML = '<p class="text-danger">Failed to load users.</p>';
      });
  }

  run() {
    if (!this.isInitialized) {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
        this.filteredUsers = [...this.users];
        this.isInitialized = true;
      } else {
        this.fetchUsers();
      }
    }
    this.el.innerHTML = this.render();
    this.addEventListeners();
  }
};

export default ListUsers;
