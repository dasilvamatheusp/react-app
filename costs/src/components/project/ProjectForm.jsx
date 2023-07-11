import { useEffect, useState } from "react";

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.scss'

const ProjectForm = ({ handleSubmit, btnText, projectData }) => {

  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})
  
  useEffect(() => {
    fetch("http://localhost:5000/categories", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      setCategories(data)
    })
    .catch((e) => console.log(e))
  }, [])

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
  }

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input 
        type='text' 
        text='Nome do projeto' 
        name='name' 
        placeholder='Insira o nome do projeto'
        handleOnChange={handleChange}
      />
      <Input
        type='number' 
        text='Orçamento do projeto' 
        name='budget' 
        placeholder='Insira o orçamento total'
        handleOnChange={handleChange}
      />
      <Select 
        name='category_id' 
        text='Selecione a categoria'
        options={categories}
      />
      <SubmitButton text={btnText}/>
    </form>
  )
}
export default ProjectForm;