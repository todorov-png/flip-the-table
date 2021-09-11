'use strict';
const $tables = document.querySelectorAll('table');

if ($tables.length) {
  $tables.forEach($table => {
    //$table = $table.cloneNode(true);
    const trArray = Array.prototype.slice.call($table.querySelectorAll('tr')),
          array = [],
          atribute = {
            'rowspan': [],
            'colspan': []
          };
    
    trArray.forEach(($tr, i) => {
      let tdArray = Array.prototype.slice.call($tr.querySelectorAll('td'));
      if (!tdArray.length) {
        tdArray = Array.prototype.slice.call($tr.querySelectorAll('th'));
      }
      elementEntryWithAttribute(atribute, tdArray, i);
      array.push(tdArray);
    });
    //createNewTable(rotateArray(returningAttributes(array, atribute)));
    replacementTable(rotateArray(returningAttributes(array, atribute)), $table)
  });

  clearPlug();
}

function elementEntryWithAttribute(atribute, tdArray, i) {
  tdArray.forEach(($td, j) => {
    const colAtribute = $td.getAttribute('colspan'),
          rowAtribute = $td.getAttribute('rowspan');

    if (colAtribute) {
      const plug = document.createElement('td');
      plug.classList.add('table-plug');
      tdArray.splice(j+1, 0, plug);
      $td.removeAttribute('colspan');
      atribute.colspan.push([i, j, colAtribute]);
    }

    if (rowAtribute) {
      $td.removeAttribute('rowspan');
      atribute.rowspan.push([i, j, rowAtribute]);
    }
  });
}

function rotateArray(array) {
  return array.map((val, index) => array.map(row => row[index]));
}

function returningAttributes(array, atribute) {
  atribute.rowspan.forEach(item => {
    array[item[0]][item[1]].setAttribute('colspan', item[2]);
    for (let i = 1; i < item[2]; i++) {
      const plug = document.createElement('td');
      plug.classList.add('table-plug');
      array[item[0]+i].splice(item[1], 0, plug);
    }
  });

  atribute.colspan.forEach(item => {
    array[item[0]][item[1]].setAttribute('rowspan', item[2]);
  });

  return array;
}

function createNewTable(array) {
  const $newTable = document.createElement('table');
  array.forEach(tr => {
    const $tr = document.createElement('tr');
    tr.forEach($td => {
      $tr.append($td)
    });
    $newTable.append($tr);
  });
  document.querySelector('.new-table').append($newTable);
}

function replacementTable(array, $table) {
  array.forEach(tr => {
    const $tr = document.createElement('tr');
    tr.forEach($td => {
      $tr.append($td)
    });
    $table.append($tr);
  });
}

function clearPlug() {
  document.querySelectorAll('.table-plug').forEach($item => $item.remove());
}