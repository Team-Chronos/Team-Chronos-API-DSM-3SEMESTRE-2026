import { useState, FormEvent, useEffect } from "react";
import { ApiTarefas } from "../../api/servicoApi";

interface Props {
  isOpen: boolean;
  onFechar: () => void;
  onSucesso?: () => void;
}

interface TipoTarefa {
  id: number;
  nome: string;
}

export default function ModalCadastroTarefa({ isOpen, onFechar, onSucesso }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [responsavelId, setResponsavelId] = useState<string>("");
  const [prazo, setPrazo] = useState("");
  const [status, setStatus] = useState("PENDENTE");
  const [tipoId, setTipoId] = useState<string>("");
  const [projetoId, setProjetoId] = useState<string>("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [tiposTarefa, setTiposTarefa] = useState<TipoTarefa[]>([]);
  const [carregandoDados, setCarregandoDados] = useState(true);

  useEffect(() => {
    if (isOpen) {
      carregarTiposTarefa();
    }
  }, [isOpen]);

  const carregarTiposTarefa = async () => {
    setCarregandoDados(true);
    try {
      const tiposRes = await ApiTarefas.get('/tipoTarefa');
      setTiposTarefa(tiposRes.data);
    } catch (err) {
      console.error("Erro ao carregar tipos de tarefa:", err);
      setErro("Erro ao carregar tipos de tarefa");
    } finally {
      setCarregandoDados(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    if (!titulo.trim()) {
      setErro("Título é obrigatório");
      setCarregando(false);
      return;
    }

    if (!descricao.trim()) {
      setErro("Descrição é obrigatória");
      setCarregando(false);
      return;
    }

    if (!prazo) {
      setErro("Prazo é obrigatório");
      setCarregando(false);
      return;
    }

    if (!tipoId) {
      setErro("Selecione um tipo de tarefa");
      setCarregando(false);
      return;
    }

    if (!projetoId) {
      setErro("Selecione um projeto (digite o ID)");
      setCarregando(false);
      return;
    }

    const dataTimestamp = new Date(prazo).getTime();

    const novaTarefa = {
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      responsavelId: responsavelId ? Number(responsavelId) : null,
      tempoMaximoMinutos: dataTimestamp,
      status: status,
      tipoTarefaId: Number(tipoId),
      projetoId: Number(projetoId)
    };

    try {
      await ApiTarefas.post("/tarefas", novaTarefa);
      
      setTitulo("");
      setDescricao("");
      setResponsavelId("");
      setPrazo("");
      setStatus("PENDENTE");
      setTipoId("");
      setProjetoId("");
      
      onFechar();
      if (onSucesso) onSucesso();
      
    } catch (err: any) {
      console.error("Erro ao criar tarefa:", err);
      setErro(err.response?.data?.message || "Erro ao criar tarefa. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  if (carregandoDados) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative p-6 rounded shadow-lg w-full max-w-lg z-10 bg-[#252525] border border-[#3e3e3e]">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-white ml-2">Carregando tipos de tarefa...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onFechar}></div>

      <div className="relative p-6 rounded shadow-lg w-full max-w-lg z-10" style={{ backgroundColor: '#252525', border: '1px solid #3e3e3e' }}>
        <h2 className="text-lg font-bold mb-4 text-white">Cadastrar Tarefa</h2>

        {erro && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded whitespace-pre-wrap">
            <strong>Erro:</strong><br />
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Título *"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-2 rounded text-white"
            style={{ backgroundColor: '#1f1f1f', borderColor: '#3e3e3e' }}
            required
          />
          
          <textarea
            placeholder="Descrição *"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border p-2 rounded text-white"
            style={{ backgroundColor: '#1f1f1f', borderColor: '#3e3e3e' }}
            rows={3}
            required
          />
          
          <input
            type="number"
            placeholder="ID do Responsável (opcional)"
            value={responsavelId}
            onChange={(e) => setResponsavelId(e.target.value)}
            className="border p-2 rounded text-white"
            style={{ backgroundColor: '#1f1f1f', borderColor: '#3e3e3e' }}
          />
          
          <input
            type="date"
            placeholder="Prazo *"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            className="border p-2 rounded text-white"
            style={{ backgroundColor: '#1f1f1f', borderColor: '#3e3e3e' }}
            required
          />
          
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded text-white"
            style={{ backgroundColor: '#1f1f1f', borderColor: '#3e3e3e' }}
            required
          >
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDA">Concluída</option>
          </select>
          
          <input
            type="number"
            placeholder="ID do Projeto *"
            value={projetoId}
            onChange={(e) => setProjetoId(e.target.value)}
            className="border p-2 rounded text-white"
            style={{ backgroundColor: '#1f1f1f', borderColor: '#3e3e3e' }}
            required
          />
          
          <select
            value={tipoId}
            onChange={(e) => setTipoId(e.target.value)}
            className="border p-2 rounded text-white"
            style={{ backgroundColor: '#1f1f1f', borderColor: '#3e3e3e' }}
            required
          >
            <option value="">Selecione o tipo de tarefa *</option>
            {tiposTarefa.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onFechar}
              className="px-4 py-2 rounded transition-colors text-white"
              style={{ backgroundColor: '#3e3e3e' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4e4e4e'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3e3e3e'}
              disabled={carregando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded text-white transition-colors"
              style={{ backgroundColor: '#3e3e3e' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4e4e4e'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3e3e3e'}
              disabled={carregando}
            >
              {carregando ? 'Cadastrando...' : 'Concluir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}