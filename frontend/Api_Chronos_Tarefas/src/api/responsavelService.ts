import { ApiResponsaveis } from './servicoApi';

export interface Responsavel {
  id: number;
  nome: string;
  email: string;
}

class ResponsavelService {
  private storageKey = 'responsaveis';

  // Buscar do backend primeiro, fallback para localStorage
  async listarTodos(): Promise<Responsavel[]> {
    try {
      // Tenta buscar do backend
      const response = await ApiResponsaveis.get('/responsaveis');
      if (response.data && Array.isArray(response.data)) {
        // Salva no localStorage como cache
        localStorage.setItem(this.storageKey, JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      console.warn("Erro ao buscar responsáveis do backend, usando localStorage:", error);
    }
    
    // Fallback para localStorage
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  async buscarPorId(id: number): Promise<Responsavel | undefined> {
    try {
      const response = await ApiResponsaveis.get(`/responsaveis/${id}`);
      return response.data;
    } catch (error) {
      console.warn("Erro ao buscar responsável:", error);
      const responsaveis = await this.listarTodos();
      return responsaveis.find(r => r.id === id);
    }
  }

  getNomePorId(id: number | null): string {
    if (!id) return 'Não atribuído';
    // Busca síncrona do cache
    const responsaveis = this.listarTodosSync();
    const resp = responsaveis.find(r => r.id === id);
    return resp ? resp.nome : `ID: ${id}`;
  }

  // Versão síncrona para cache
  private listarTodosSync(): Responsavel[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  async adicionar(responsavel: Omit<Responsavel, 'id'>): Promise<Responsavel> {
    try {
      const response = await ApiResponsaveis.post('/responsaveis', responsavel);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar responsável:", error);
      // Fallback para localStorage
      const responsaveis = this.listarTodosSync();
      const novoId = responsaveis.length > 0 ? Math.max(...responsaveis.map(r => r.id)) + 1 : 1;
      const novo = { id: novoId, ...responsavel };
      responsaveis.push(novo);
      localStorage.setItem(this.storageKey, JSON.stringify(responsaveis));
      return novo;
    }
  }

  async atualizar(id: number, dados: Partial<Responsavel>): Promise<Responsavel | null> {
    try {
      const response = await ApiResponsaveis.patch(`/responsaveis/${id}`, dados);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar responsável:", error);
      // Fallback para localStorage
      const responsaveis = this.listarTodosSync();
      const index = responsaveis.findIndex(r => r.id === id);
      if (index !== -1) {
        responsaveis[index] = { ...responsaveis[index], ...dados };
        localStorage.setItem(this.storageKey, JSON.stringify(responsaveis));
        return responsaveis[index];
      }
      return null;
    }
  }

  async deletar(id: number): Promise<boolean> {
    try {
      await ApiResponsaveis.delete(`/responsaveis/${id}`);
      return true;
    } catch (error) {
      console.error("Erro ao deletar responsável:", error);
      const responsaveis = this.listarTodosSync();
      const filtered = responsaveis.filter(r => r.id !== id);
      if (filtered.length !== responsaveis.length) {
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        return true;
      }
      return false;
    }
  }
}

export default new ResponsavelService();