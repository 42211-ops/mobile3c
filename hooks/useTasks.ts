/**
 * Hook customizado para gerenciamento de tarefas
 * Gerencia estado, requisições à API e operações CRUD
 */

import { useState, useEffect } from 'react';
import { API_URL, MESSAGES } from '../utils/constants';
import type { Task, TaskFormData, UseTasksReturn } from '../types';

export function useTasks(): UseTasksReturn {
  // Estados do hook
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Busca todas as tarefas da API
  async function fetchTasks(): Promise<void> { 
    setLoading(true); // Inicia loading
    setError(null); // Limpa erros anteriores
    try {
      const response = await fetch(API_URL); // GET request
      if (!response.ok) throw new Error('Erro ao carregar tarefas');
      const data: Task[] = await response.json(); // Parse JSON
      setTasks(data); // Atualiza estado com tarefas
    } catch (err) {
      setError(MESSAGES.ERROR_LOAD); // Define mensagem de erro
      console.error('Erro:', err); // Log para debug
    } finally {
      setLoading(false); // Finaliza loading
    }
  } 


  // Cria nova tarefa
  async function createTask(taskData: TaskFormData): Promise<boolean> {
    if(!taskData.title.trim()){
      setError(MESSAGES.ERROR_EMPTY_TITLE);
      return false;
    }

    setSubmitting(true); // Indica início do envio
    setError(null);

    try{

      const response = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application.json"},
      body: JSON.stringify({...taskData, completed: false}) // Nova tarefa não concluída (default)
    });

    if(!response.ok){
      const errorData = await response.json();
      setError(errorData.error || MESSAGES.ERROR_CREATE);
      return false;
    };

    await fetchTasks();
    return true;


    } catch(err){

      setError(MESSAGES.ERROR_CONNECTION)
      console.log("Erro: ", err)

    } finally{

      setSubmitting(false);

    };
  };
  
  //Atualiza uma tarefa existente
  async function updateTask(id: number, taskData: TaskFormData): Promise<boolean> {
    if(!taskData.title.trim()){
      setError(MESSAGES.ERROR_EMPTY_TITLE);
      return false;
    }

    setSubmitting(true); // Indica início do envio
    setError(null);

    try{

      const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application.json"},
      body: JSON.stringify({taskData}) // Nova tarefa não concluída (default)
    });

    if(!response.ok){
      const errorData = await response.json();
      setError(errorData.error || MESSAGES.ERROR_UPDATE);
      return false;
    };

    await fetchTasks();
    return true;


    } catch(err){

      setError(MESSAGES.ERROR_CONNECTION)
      console.log("Erro: ", err)

    } finally{

      setSubmitting(false);

    };
  };
  
  //Alterna o status de conclusão
  async function toggleTask(id: number): Promise<void> {
    try{

      // PATCH request para alternar status
    const response = await fetch(`${API_URL}/${id}`, {method: "PATCH"});

    if(!response.ok){throw new Error("Erro ao atualizar tarefa")};
    await fetchTasks();

    } catch(err){
      setError(MESSAGES.ERROR_UPDATE);      
      console.log("Erro: ", err);

    } 
  }
    
  //Remove uma tarefa
  async function deleteTask(id: number): Promise<void> {
    try{
      const response = await fetch(`${API_URL}/${id}/toggle`, {method: "DELETE"});
      if(!response.ok){throw new Error("Erro ao remover tarefa")};
      await fetchTasks();
    
    } catch(err){
      setError(MESSAGES.ERROR_DELETE);      
      console.log("Erro: ", err);
    }
  }
  
  useEffect(() => {
    fetchTasks(); // Executa apenas uma vez na montagem
  }, []);

  return{
    tasks,
    loading,
    error,
    submitting,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    fetchTasks
  };
}