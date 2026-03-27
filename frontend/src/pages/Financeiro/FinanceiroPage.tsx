import IndicadoresGrid from "../../components/dashboard/IndicadoresGrid";
import ListaProfissionais from "../../components/dashboard/ListaProfissionais";
import ListaProjetos from "../../components/dashboard/ListaProjetos";
import { dashboardMock, profissionaisMock, projetosMock } from "../../Teste/FincanceiroMock";


function valorValido(valor: number): boolean {
  return Number.isFinite(valor);
}

function formatarMoeda(valor: number): string {
  if (!valorValido(valor)) {
    return "--";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
}

function formatarInteiro(valor: number): string {
  if (!valorValido(valor)) {
    return "--";
  }

  return new Intl.NumberFormat("pt-BR").format(valor);
}

export default function PaginaDashboardFinanceiro() {
  return (
    <main className="min-h-screen bg-[#1b1b1f] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <IndicadoresGrid dashboard={dashboardMock} />

            <section className="grid gap-5 md:grid-cols-2">
              <ListaProjetos projetos={projetosMock} />
              <ListaProfissionais profissionais={profissionaisMock} />
            </section>
          </div>

          <aside className="h-[681px] rounded-[28px] bg-gradient-to-b from-[#6627cc] to-[#4a1898] px-8 py-9 shadow-[0_20px_60px_rgba(76,29,149,0.35)]">
            <div className="flex h-full flex-col justify-start gap-16">
              <div>
                <p className="text-[15px] font-medium text-white/85">
                  Desenvolvedores
                </p>
                <p className="mt-4 text-6xl font-semibold leading-none">
                  {formatarInteiro(dashboardMock.totalDesenvolvedores)}
                </p>
                {!valorValido(dashboardMock.totalDesenvolvedores) && (
                  <p className="mt-3 text-sm text-white/60">
                    Sem dados disponíveis
                  </p>
                )}
              </div>

              <div>
                <p className="text-[15px] font-medium text-white/85">
                  Custo Total Projetos
                </p>
                <p className="mt-4 text-6xl font-semibold leading-tight">
                  {formatarMoeda(dashboardMock.custoTotal)}
                </p>
                {!valorValido(dashboardMock.custoTotal) && (
                  <p className="mt-3 text-sm text-white/60">
                    Sem dados disponíveis
                  </p>
                )}
              </div>

              <div>
                <p className="text-[15px] font-medium text-white/85">
                  Projetos Concluídos
                </p>
                <p className="mt-4 text-6xl font-semibold leading-none">
                  {formatarInteiro(dashboardMock.projetosConcluidos)}
                </p>
                {!valorValido(dashboardMock.projetosConcluidos) && (
                  <p className="mt-3 text-sm text-white/60">
                    Sem dados disponíveis
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}