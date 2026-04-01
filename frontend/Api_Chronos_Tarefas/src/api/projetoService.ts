import { ApiTarefas } from './servicoApi';

export interface Projeto {
  id: number;
  nome: string;
  descricao?: string;
}

class ProjetoService {
  private storageKey = 'projetos';

  async listarTodos(): Promise<Projeto[]> {
    try {
      const response = await ApiTarefas.get('/projetos');
      if (response.data && Array.isArray(response.data)) {
        localStorage.setItem(this.storageKey, JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      console.warn("Erro ao buscar projetos do backend, usando localStorage:", error);
    }
    
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  async buscarPorId(id: number): Promise<Projeto | undefined> {
    try {
      const response = await ApiTarefas.get(`/projetos/${id}`);
      return response.data;
    } catch (error) {
      console.warn("Erro ao buscar projeto:", error);
      const projetos = await this.listarTodos();
      return projetos.find(p => p.id === id);
    }
  }

  getNomePorId(id: number): string {
    const projetos = this.listarTodosSync();
    const projeto = projetos.find(p => p.id === id);
    return projeto ? projeto.nome : `Projeto ${id}`;
  }

  private listarTodosSync(): Projeto[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  async adicionar(projeto: Omit<Projeto, 'id'>): Promise<Projeto> {
    try {
      const response = await ApiTarefas.post('/projetos', projeto);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar projeto:", error);
      const projetos = this.listarTodosSync();
      const novoId = projetos.length > 0 ? Math.max(...projetos.map(p => p.id)) + 1 : 1;
      const novo = { id: novoId, ...projeto };
      projetos.push(novo);
      localStorage.setItem(this.storageKey, JSON.stringify(projetos));
      return novo;
    }
  }

  async atualizar(id: number, dados: Partial<Projeto>): Promise<Projeto | null> {
    try {
      const response = await ApiTarefas.patch(`/projetos/${id}`, dados);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
      const projetos = this.listarTodosSync();
      const index = projetos.findIndex(p => p.id === id);
      if (index !== -1) {
        projetos[index] = { ...projetos[index], ...dados };
        localStorage.setItem(this.storageKey, JSON.stringify(projetos));
        return projetos[index];
      }
      return null;
    }
  }

  async deletar(id: number): Promise<boolean> {
    try {
      await ApiTarefas.delete(`/projetos/${id}`);
      return true;
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      const projetos = this.listarTodosSync();
      const filtered = projetos.filter(p => p.id !== id);
      if (filtered.length !== projetos.length) {
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        return true;
      }
      return false;
    }
  }
}

export default new ProjetoService();