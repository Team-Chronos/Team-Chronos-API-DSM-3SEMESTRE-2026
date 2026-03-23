import { useState } from "react";

function CadastroProfissional() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");

  const projetos = [
    { id: 1, nome: "Projeto A" },
    { id: 2, nome: "Projeto B" },
    { id: 3, nome: "Projeto C" }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Cadastro de Profissional
      </h1>

      <div className="bg-gray-800 p-8 rounded-xl shadow-md">

        <form className="flex flex-col gap-6">

          {/* Nome */}
          <div>
            <label className="text-sm text-gray-300">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full mt-2 p-4 rounded-lg bg-gray-700 border border-gray-600 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-4 rounded-lg bg-gray-700 border border-gray-600 outline-none"
            />
          </div>

          {/* Cargo */}
          <div>
            <label className="text-sm text-gray-300">Cargo</label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="w-full mt-2 p-4 rounded-lg bg-gray-700 border border-gray-600 outline-none"
              placeholder="Ex: Desenvolvedor, QA, PO"
            />
          </div>

          {/* Projetos */}
          <div>
            <label className="text-sm text-gray-300">
              Projetos vinculados
            </label>

            <select
              multiple
              className="w-full mt-2 p-4 rounded-lg bg-gray-700 border border-gray-600 h-40"
            >
              {projetos.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Botão */}
          <button className="bg-purple-600 hover:bg-purple-700 p-4 rounded-lg font-semibold">
            Cadastrar
          </button>

        </form>

      </div>
    </div>
  );
}

export default CadastroProfissional;