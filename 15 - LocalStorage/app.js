const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const btnCheckAll = document.querySelector("[name=checkAll");
const btnUncheckAll = document.querySelector("[name=uncheckAll");
const btnDeleteAll = document.querySelector("[name=deleteAll");

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  // console.log(text);
  const item = {
    text,
    done: false
  };
  // console.log(item);
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}
// function is a little bit more resilient. Could pass any array of plates and any destination html element, it will work (two menus for example).
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? "checked" : ""} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
  }).join('');
}

function updateStoragePopulateList() {
  // update localStorage and re-populate list
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function toggleDone(e) {
  if (!e.target.matches('input')) return; //skip this unless it's an input
  // console.log(e.target);
  const el = e.target;
  // console.log(el.dataset.index);
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  updateStoragePopulateList();
}

function checkAllCheckboxes() {
  // console.log('hello');
  if (items.length === 0) return;
  items.forEach((item) => {
    item.done = true;
  });
  updateStoragePopulateList();
};

function uncheckAllCheckboxes() {
  // console.log('hello');
  if (items.length === 0) return;
  items.forEach((item) => {
    item.done = false;
  });
  updateStoragePopulateList();
};

function deleteAllItems() {
  if (items.length === 0) return;
  if (confirm('Are you sure you want to delete all ?')) {
    items.length = 0;
    updateStoragePopulateList();
  }
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
btnCheckAll.addEventListener('click', checkAllCheckboxes);
btnUncheckAll.addEventListener('click', uncheckAllCheckboxes);
btnDeleteAll.addEventListener('click', deleteAllItems);

populateList(items, itemsList);
