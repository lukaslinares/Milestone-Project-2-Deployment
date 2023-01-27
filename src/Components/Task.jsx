import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavBar from './NavBar';
import Form from './Form';
import Edit from "./Edit";
import "./Task.css"
import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"

function Task() {
    const [tasks, setTasks] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/api/tasks')
            const resData = await response.json()
            setTasks(resData)
        }
        fetchData()
    }, [])

function deleteTask(id){
    fetch(`http://localhost:3000/api/tasks/${id}`, { 
    method: 'DELETE',
    headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(data => console.log(data)) 
    .catch(error => console.error(error))
    console.log("deleted: ", id)

    navigate(0);
}


  return (
    <div>
        <NavBar/>
        <h1>To-Do List</h1>
        <div className='grid'>

            {/* SAMPLE CARD */}
            <Card style={{ width: '18rem' }} className="box boxes">
                <Card.Body>
                    <Card.Title>Tuesday</Card.Title>
                    <Link to="/tasks/form">
                    <Button variant="primary" size="sm">Add Task</Button>
                    </Link>
                    <Link to="/tasks/form">
                    <Button 
                        variant="info" 
                        size="sm" 
                        type='submit'>
                            Edit
                    </Button>
                    </Link>
                    <Link to="/tasks">
                    <Button 
                        variant="danger" 
                        size="sm" 
                        type='submit'>
                            Delete
                    </Button>
                    </Link>
                </Card.Body>
            </Card>
            {/* SAMPLE CARD */}

            {tasks.length && tasks.map(e => (
            <Card style={{ width: '18rem' }} className="box boxes">
            <Card.Body>
                <Card.Title>{e.day}</Card.Title>
                <Card.Text>{e.tasks}</Card.Text>
                <Card.Text>{e.complete && 'Done ✅'}</Card.Text>

                    {/* EDIT BUTTON */}

                    <Link to={`/tasks/form/edit/${e.id}`}>
                    <Button variant="warning" size="sm">
                        Edit
                    </Button>
                    </Link>
                   

                    {/* DELETE BUTTON */}
                    <Button
                        onClick={ () => deleteTask(e.id)} 
                        variant="danger" 
                        size="sm" 
                        type='submit'>
                            Delete
                    </Button>
                <form action=""></form>
            </Card.Body>
            </Card>
            )) }
        </div>
    </div>
  );
}

export default Task;