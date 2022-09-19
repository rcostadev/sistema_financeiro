import { useState, useEffect } from 'react';

import * as C from './App.styles';

import { Item } from './types/item';
//import { Category } from './types/category';
import { categories } from './data/categories';
import { items } from './data/items';
import { getCurretMonth } from './helpers/dateFilter';
import { filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InfoArea';
import { InputArea } from './components/InputArea';

const App = () =>{

  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurretMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() =>{
    setFilteredList( filterListByMonth(list,currentMonth));
  }, [list, currentMonth]);

  useEffect(() =>{
    let incomeCont = 0;
    let expenseCont = 0;

    for(let i in filteredList){
      if(categories[filteredList[i].category].expense){
        expenseCont += filteredList[i].value
      } else{
        incomeCont += filteredList[i].value
      }
    }

    setExpense(expenseCont);
    setIncome(incomeCont);
  }, [filteredList])

  const HandleMonthChage = (newMonth: string) =>{
    setCurrentMonth(newMonth);
  }

  const handleAddItem = (item: Item) => {
    let newList = [...list];
      newList.push(item);
      setList(newList);
    }



  return(
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Finaceiro</C.HeaderText>
      </C.Header>
      <C.Body>

        <InfoArea 
          currentMonth={currentMonth}
          onMonthChange={HandleMonthChage}
          income={income}
          expense={expense} 
        />

        <InputArea onAdd={handleAddItem}/>

        {/* Componete responsavel pela exibição dos itens na tela */}
        <TableArea list={filteredList}/>
      </C.Body>
    </C.Container>
  );
}

export default App;
