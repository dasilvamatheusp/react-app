import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from './Projects.module.scss'

import Message from '../layout/Message';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import LinkButton from "../layout/LinkButton";
import ProjectCard from '../project/ProjectCard'

const Projects = () => {

  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation()
  let message = ''

  if(location.state) {
    message = location.state.message
  }

  useEffect(()=> {
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
        },
      }).then(resp => resp.json())
      .then(data => {
        console.log(data)
        setProjects(data)
        setRemoveLoading(true)
      })
      .catch(e => console.log(e))
    }, 1500);
  }, [])

  const removeProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => res.json())
    .then(() => {
      setProjects(projects.filter((project) => project.id !== id))
      setProjectMessage('Projeto removido com sucesso.')
    })
    .catch(e => console.log(e))
  }

  return (
    <div className={styles.project_container}>
      <div  className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to='/NewProject' text='Criar Projeto'/>
      </div>
      {message && <Message type="success" msg={message}/>}{projectMessage && <Message type="success" msg={projectMessage}/>}
      <Container customClass="start">
        {projects.length > 0 && 
          projects.map((project) => (
            <ProjectCard 
            name={project.name} 
            id={project.id} 
            budget={project.budget} 
            category={project.category.name} 
            handleRemove={removeProject}
            key={project.id}/>
            
          ))
        }{!removeLoading && <Loading />}{removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados.</p>
        )}
      </Container>
    </div>
  )
}

export default Projects;