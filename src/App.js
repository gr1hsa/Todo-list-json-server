import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/users';

  const [items, setItems] = useState([]);

  useEffect(() => {

    const fetchItems = async () => {
        const response = await fetch(API_URL);
        const listItems = await response.json();
        setItems(listItems);
        
    }
    fetchItems();

  }, [])

  const addItem = async () => {
    const task = document.getElementById("todo_str").value
    if(task){
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const myNewItem = { id, is_Done: false, task };
      const listItems = [...items, myNewItem];
      setItems(listItems);

      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myNewItem)
      }

      const result = await apiRequest(API_URL, postOptions);
    }
  }

  const changeComplete = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, is_Done: !item.is_Done } : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ is_Done: myItem[0].is_Done })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
  }

  const deleteItem = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
  }


  return (
    <div>
       <form class="form-inline d-flex justify-content-center  mt-5">
      <div class="form-group">
                <input type="text" class="form-control mr-3 mb-5" id="todo_str" placeholder="TODO" name="phone"/>
      </div>
      <button class="btn btn-primary mb-5" id="create-user" type="button" onClick={addItem}>Добавить задачу</button>
      </form>
      <div>
      
      <table class="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Is done</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

      { items.map((item) => {
        return (
            <tbody>
            <tr>
              <td align='center'>{item.id}</td>
              <td align='center'>{item.task}</td>
              <td><input type="checkbox" class='big-checkbox' onChange={() => changeComplete(item.id)} checked={item.is_Done ? true : false}/></td>
              <td> <button type='button' id='delete-user' class='btn btn-danger' onClick={() => deleteItem(item.id)}>X</button></td>
           </tr>
          </tbody>
        );
      }) }
      </table>
    </div>
    </div>
  );
}

export default App;