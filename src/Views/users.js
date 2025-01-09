const user = (data) => {
  const {
    name: { first, last },
    picture: { large }
  } = data;

  return (`
    <div class="col-2 mt-4">
      <div class="card">
        <img src="${large}" class="card-img-top" alt="${first}">
        <div class="card-body">
          <h5 class="card-title">${first} ${last}</h5>
          <button class="btn btn-primary btn-get-info">Get Informations</button>
        </div>
      </div>
    </div>
  `);
};

export default (datas) => `
  <div class="row">
    ${datas.map((data) => user(data)).join('')}
  </div>
`;
