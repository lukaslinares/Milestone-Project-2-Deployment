import { useNavigate, useParams } from "react-router-dom"
import React from "react";
import { useState, useEffect } from 'react';
import NavBar from "./NavBar";
import Button from 'react-bootstrap/Button';
import "./Form.css"

function EditTask(){
    const [form, setForm] = useState({
      day: '',
      tasks: '',
      complete: false
    });
    let {id} = useParams();
    let navigate = useNavigate();
  
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`)
            const resData = await response.json()
            setForm(resData)
        }
        fetchData()
    }, [])

    const onChange = (e) => {
      const { value, name, type, checked } = e.target;
  
      setForm((state) => ({
        ...state,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  
    const showData = () => {
      console.log('Form: ', form);
    }
  
    const onSubmit = (e) => {
      e.preventDefault();
      showData();
      fetch(`http://localhost:3000/api/tasks/${id}`,{ 
        method: 'PUT', 
        body: JSON.stringify(form),
        headers: {"Content-Type": "application/json"}
        }).then(response => response.json())
        .then(data => console.log(data)) 
        .catch(error => console.error(error))
        console.log("Edited: ", id)
        navigate('/tasks');
    }
  
    return (
      <div>
        <h1>Update Task</h1>
        <NavBar/>
        <div className="background">
          <form onSubmit={onSubmit}>
            <div>
            <label>
                <div className="day">Day:</div>
                <select 
                  onChange={onChange} 
                  className="round"
                  name="day">
                    <option disabled selected value> - Select An Option - </option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>
              </label>
              </div>

              <label>
                <div>Task:</div>
                <textarea 
                  onChange={onChange} 
                  className="task"
                  name="tasks" 
                  value ={form.tasks}>
                </textarea>
              </label>
    
              <div className="check">
                <label>
                  <div>
                    Task Completed?
                      <div>
                        <input 
                          type="checkbox" 
                          className="comp"
                          onChange={onChange} 
                          name="complete" 
                          value={form.complete}
                          checked={form.complete}>
                        </input> Yes
                      </div>
                  </div>
                </label>
              </div>
            <Button 
              size="sm" 
              type='submit'
              className="update-task"
              variant="primary">
              Update
            </Button>
          </form>
        </div>
      </div>
    )
  }
  
  export default EditTask;
