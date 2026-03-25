import { useState } from "react";

function CadastroProfissional() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [projetosSelecionados, setProjetosSelecionados] = useState<number[]>([]);
  const [buscaProjeto, setBuscaProjeto] = useState("");

  const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);

  const projetos = [
    { id: 1, nome: "Projeto A" },
    { id: 2, nome: "Projeto B" },
    { id: 3, nome: "Projeto C" }
  ];

  const projetosFiltrados = projetos.filter((proj) =>
    proj.nome.toLowerCase().includes(buscaProjeto.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !cargo) {
      setMensagem({
        tipo: "erro",
        texto: "Preencha todos os campos obrigatórios"
      });

      setTimeout(() => setMensagem(null), 3000);
      return;
    }

    try {
      const dados = {
        nome,
        email,
        cargo,
        projetosIds: projetosSelecionados
      };

      console.log(dados);

      setMensagem({
        tipo: "sucesso",
        texto: "Profissional cadastrado com sucesso!"
      });

      setNome("");
      setEmail("");
      setCargo("");
      setProjetosSelecionados([]);
      setBuscaProjeto("");

      setTimeout(() => setMensagem(null), 3000);

    } catch (error) {
      setMensagem({
        tipo: "erro",
        texto: "Erro ao cadastrar profissional"
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Cadastro de Profissional
      </h1>

      <div className="bg-[#252525] p-8 rounded-xl shadow-md">

        {mensagem && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-medium
              ${mensagem.tipo === "sucesso"
                ? "bg-green-600/20 text-green-400 border border-green-500"
                : "bg-red-600/20 text-red-400 border border-red-500"
              }`}
          >
            {mensagem.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Nome */}
          <div>
            <label className="text-sm text-gray-300">Nome *</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full mt-2 p-4 rounded-lg bg-[#3e3e3e] border border-[#3e3e3e] outline-none text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-4 rounded-lg bg-[#3e3e3e] border border-[#3e3e3e] outline-none text-white"
            />
          </div>

          {/* Cargo */}
          <div>
            <label className="text-sm text-gray-300">Cargo *</label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="w-full mt-2 p-4 rounded-lg bg-[#3e3e3e] border border-[#3e3e3e] outline-none text-white"
              placeholder="Ex: Desenvolvedor, QA, PO"
            />
          </div>

          {/* Projetos */}
          <div>
            <label className="text-sm text-gray-300">
              Projetos vinculados (opcional)
            </label>

            {/* Busca */}
            <input
              type="text"
              placeholder="Buscar projeto..."
              value={buscaProjeto}
              onChange={(e) => setBuscaProjeto(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-[#3e3e3e] border border-[#3e3e3e] outline-none text-white"
            />

            {/* Lista com checkbox */}
  <div className="mt-2 max-h-40 overflow-y-auto bg-[#3e3e3e] border border-[#3e3e3e] rounded-lg p-3 flex flex-col gap-2">

    {projetosFiltrados.map((proj) => (
      <label
        key={proj.id}
        className="flex items-center gap-3 text-white cursor-pointer hover:bg-[#4a4a4a] p-2 rounded"
      >
        <input
          type="checkbox"
          checked={projetosSelecionados.includes(proj.id)}
          onChange={() => {
            if (projetosSelecionados.includes(proj.id)) {
              setProjetosSelecionados(
                projetosSelecionados.filter(id => id !== proj.id)
              );
            } else {
              setProjetosSelecionados([...projetosSelecionados, proj.id]);
            }
          }}
          className="accent-purple-600"
        />

        {proj.nome}
      </label>
    ))}

  </div>

  <p className="text-xs text-gray-400 mt-1">
    Você pode selecionar mais de um projeto
  </p>
</div>

          {/* Botão */}
          <button
            type="submit"
            className="p-4 rounded-lg font-semibold text-white 
                       bg-gradient-to-r from-[#4e31aa] to-[#3a1078] 
                       hover:opacity-90 transition"
          >
            Cadastrar
          </button>

        </form>

      </div>
    </div>
  );
}

export default CadastroProfissional;