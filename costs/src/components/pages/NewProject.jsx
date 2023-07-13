import { useNavigate } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.scss';


const NewProject = () => {

  const history = useNavigate()


    const createPost = (project) => {

    project.cost = 0
    project.services = []


    fetch("http://localhost:5000/projects", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data)=> {
      console.log(data)
      //redirect
      history('/projects', { state: { message: 'Projeto criado com sucesso!' } })
    })
    .catch((e)=> console.log(e))
  }
  

  return (
    <div className={styles.newProject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText='Criar Projeto'/>
    </div>
  )
}

export default NewProject;