'use strict';
//Получаю все таблицы на странице
const $tables = document.querySelectorAll('.table');

//Перебираю таблицы
$tables.forEach($itemTable => {
  //Получаю все строки в таблице
  const $trs = $itemTable.querySelectorAll('tr');
  const $array = [];

  //Перебираю каждую строку
  $trs.forEach(($tr, j) => {
    //Получаю массив элементов в строке
    let $tds = $tr.querySelectorAll('td');

    if (!$tds.length) {
      $tds = $tr.querySelectorAll('th');
    }






    //Меняю атрибуты в таблице
    $tds.forEach($td => {
      const colAtribute = $td.getAttribute('colspan');

      //Если я нахожу атрибут обьединяющий столбцы в один, то я меняю его на rowspan и все последующие элементы массива я должен сместить и удалить пустые элементы ниже строки
      if (colAtribute) {
        $td.removeAttribute('colspan');
        $td.setAttribute('rowspan', colAtribute);
      }
      //console.log($td.getAttribute('colspan'))

    });






    //Добавляю элементы в массив
    $array.push($tds);
  });






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
        $tr.append(document.createElement('td'));
        //console.log(i, j) 
      }
      
    });

    $newTable.append($tr);
  });

  document.querySelector('.new-table').append($newTable);
});