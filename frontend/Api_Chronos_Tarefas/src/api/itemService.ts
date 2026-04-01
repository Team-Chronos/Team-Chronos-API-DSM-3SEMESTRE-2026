import { ApiTarefas } from './servicoApi';

export interface Item {
  id: number;
  nome: string;
  descricao: string;
  tarefaId: number;
  createdAt: string;
}

class ItemService {
  private storageKey = 'itens';

  private getItens(): Item[] {
    const itens = localStorage.getItem(this.storageKey);
    return itens ? JSON.parse(itens) : [];
  }

  private saveItens(itens: Item[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(itens));
  }

  async getItensPorTarefa(tarefaId: number): Promise<Item[]> {
    try {
      const response = await ApiTarefas.get(`/tarefa/${tarefaId}`);
      if (response.data) {
        if (Array.isArray(response.data)) {
          return response.data.map((item: any) => ({
            ...item,
            createdAt: item.createdAt || new Date().toISOString()
          }));
        } else {
          return [{
            ...response.data,
            createdAt: response.data.createdAt || new Date().toISOString()
          }];
        }
      }
      return [];
    } catch (error) {
      console.warn("Erro ao buscar itens do backend, usando localStorage:", error);
      const itens = this.getItens();
      return itens.filter(item => item.tarefaId === tarefaId);
    }
  }

  async criarItem(nome: string, descricao: string, tarefaId: number): Promise<Item> {
    try {
      const response = await ApiTarefas.post('/itens', {
        nome,
        descricao,
        tarefaId
      });
      return {
        ...response.data,
        createdAt: response.data.createdAt || new Date().toISOString()
      };
    } catch (error) {
      console.error("Erro ao criar item no backend, salvando localmente:", error);
      const itens = this.getItens();
      const novoItem: Item = {
        id: Date.now(),
        nome,
        descricao,
        tarefaId,
        createdAt: new Date().toISOString()
      };
      itens.push(novoItem);
      this.saveItens(itens);
      return novoItem;
    }
  }

  async deletarItem(itemId: number): Promise<void> {
    try {
      await ApiTarefas.delete(`/itens/${itemId}`);
    } catch (error) {
      console.error("Erro ao deletar item do backend:", error);
      const itens = this.getItens();
      const filteredItens = itens.filter(item => item.id !== itemId);
      this.saveItens(filteredItens);
    }
  }

  async atualizarItem(itemId: number, nome: string, descricao: string): Promise<Item | null> {
    try {
      const response = await ApiTarefas.put(`/itens/${itemId}`, { nome, descricao });
      return {
        ...response.data,
        createdAt: response.data.createdAt || new Date().toISOString()
      };
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      const itens = this.getItens();
      const index = itens.findIndex(item => item.id === itemId);
      if (index !== -1) {
        itens[index] = { ...itens[index], nome, descricao };
        this.saveItens(itens);
        return itens[index];
      }
      return null;
    }
  }
}

export default new ItemService();