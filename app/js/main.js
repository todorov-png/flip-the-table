'use strict';
//Получаю все таблицы на странице
//const $tables = document.querySelectorAll('.table');
const $table = document.querySelector('.table');
$tables = [$table.cloneNode(true)];

//Перебираю таблицы
$tables.forEach($itemTable => {
  //Получаю все строки в таблице
  const $trs = $itemTable.querySelectorAll('tr');
  const $array = [];

  //Перебираю каждую строку
  $trs.forEach(($tr, j) => {
    //Получаю массив элементов в строке
    let $tds = $tr.querySelectorAll('td');
    const $tdsArray = [];

    if (!$tds.length) {
      $tds = $tr.querySelectorAll('th');
    }

    //Меняю атрибуты в таблице
    $tds.forEach($td => {
      const colAtribute = $td.getAttribute('colspan');
      //Если я нахожу атрибут обьединяющий столбцы в один, то я меняю его на rowspan и все последующие элементы массива я должен сместить и удалить пустые элементы ниже строки
      if (colAtribute) {
        $td.removeAttribute('colspan');
        $tdsArray.push($td);
        for(let i = 0; i < colAtribute-1; i++) {
          $tdsArray.push(null);
        }
        $td.setAttribute('rowspan', colAtribute);
      } else {
        $tdsArray.push($td);
      }

      //Так же и с rowspan
      const rowAtribute = $td.getAttribute('rowspan');
      if (rowAtribute) {
        $td.removeAttribute('rowspan');
        $td.setAttribute('colspan', rowAtribute);
      }
    });

    //Добавляю элементы в массив
    $array.push($tdsArray);
  });

  console.log($array);

  //Разворачиваю массив и создаю элемент таблицы
  const $newArray = $array.map((val, index) => $array.map(row => row[index]));
  const $newTable = document.createElement('table');

  //Перебираю развернутый массив и добавляю в таблицу элементы с него
  $newArray.forEach(($row, i) => {
    const $tr = document.createElement('tr');

    $row.forEach(($data, j) => {
      if ($data) {
        $tr.append($data);
      } else {
        //$tr.append(document.createElement('td'));
        //console.log(i, j) 
      } 
      
    });

    $newTable.append($tr);
  });

  document.querySelector('.new-table').append($newTable);
});