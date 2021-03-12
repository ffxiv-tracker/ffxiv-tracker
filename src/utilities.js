import axios from 'axios';

function getMasterTasks(){
    let tasks = [];
    axios.get('http://34.219.238.37/tasks')
  .then(function (response) {
    tasks = response.data
    console.log('response', response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  return tasks;
}

export { getMasterTasks };