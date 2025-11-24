import { useParams } from "@tanstack/react-router";
import { useDevolucaoStore } from "../stores/conferencia"

export default function Reentrega() {
  const { id } = useParams({ from: '/devolucao/reentrega/$id' });
  const { demanda: demandaStore, checklist: checklistStore, conferencias, anomalias } = useDevolucaoStore()

  // Função para formatar o status
  const formatStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'EM_CONFERENCIA': 'Em Conferência',
      'FINALIZADO': 'Finalizado',
      'PENDENTE': 'Pendente'
    }
    return statusMap[status] || status
  }

  // Função para formatar o sync status
  const formatSyncStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'unsynced': 'Não Sincronizado',
      'syncing': 'Sincronizando',
      'synced': 'Sincronizado'
    }
    return statusMap[status] || status
  }

  const demanda = demandaStore.find((d) => d.id === Number(id))
  const checklist = checklistStore.find((c) => c.id === Number(id))

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Dados da Reentrega</h1>

      {/* Dados da Demanda */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📋 Dados da Demanda</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="font-medium text-gray-700">ID:</label>
            <p className="text-gray-900">{demanda?.id || 'N/A'}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Placa:</label>
            <p className="text-gray-900">{demanda?.placa || 'N/A'}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Motorista:</label>
            <p className="text-gray-900">{demanda?.motorista || 'N/A'}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Transportadora:</label>
            <p className="text-gray-900">{demanda?.transportadora || 'N/A'}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Status:</label>
            <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
              demanda?.status === 'EM_CONFERENCIA' ? 'bg-yellow-100 text-yellow-800' :
              demanda?.status === 'FINALIZADO' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {demanda?.status ? formatStatus(demanda.status) : 'N/A'}
            </span>
          </div>
          <div>
            <label className="font-medium text-gray-700">Sync Status:</label>
            <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
              demanda?.syncStatus === 'synced' ? 'bg-green-100 text-green-800' :
              demanda?.syncStatus === 'syncing' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {demanda?.syncStatus ? formatSyncStatus(demanda.syncStatus) : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">✅ Checklist</h2>
        {checklist ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">Temperatura Produto:</label>
                <p className="text-gray-900">
                  {checklist.temperaturaProduto ? `${checklist.temperaturaProduto}°C` : 'N/A'}
                </p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Temperatura Caminhão:</label>
                <p className="text-gray-900">
                  {checklist.temperaturaCaminhao ? `${checklist.temperaturaCaminhao}°C` : 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700">Foto Baú Fechado:</label>
              <p className="text-gray-900 text-sm break-all">
                {checklist.fotoBauFechado ? '✅ Disponível' : '❌ Não disponível'}
              </p>
              {checklist.fotoBauFechado && (
                <img 
                  src={checklist.fotoBauFechado} 
                  alt="Baú Fechado" 
                  className="mt-2 h-32 w-32 object-cover rounded border"
                />
              )}
            </div>

            <div>
              <label className="font-medium text-gray-700">Foto Baú Aberto:</label>
              <p className="text-gray-900 text-sm break-all">
                {checklist.fotoBauAberto ? '✅ Disponível' : '❌ Não disponível'}
              </p>
              {checklist.fotoBauAberto && (
                <img 
                  src={checklist.fotoBauAberto} 
                  alt="Baú Aberto" 
                  className="mt-2 h-32 w-32 object-cover rounded border"
                />
              )}
            </div>

            <div>
              <label className="font-medium text-gray-700">Anomalias:</label>
              {checklist.anomalias && checklist.anomalias.length > 0 ? (
                <ul className="list-disc list-inside text-gray-900 space-y-1">
                  {checklist.anomalias.map((anomalia, index) => (
                    <li key={index}>{anomalia}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-900">Nenhuma anomalia registrada</p>
              )}
            </div>

            <div>
              <label className="font-medium text-gray-700">Fotos de Anomalias:</label>
              {checklist.fotosAnomalia && checklist.fotosAnomalia.length > 0 ? (  
                <div className="flex flex-wrap gap-2 mt-2">
                  {checklist.fotosAnomalia.map((foto, index) => (
                    <img 
                      key={index}
                      src={foto} 
                      alt={`Anomalia ${index + 1}`} 
                      className="h-20 w-20 object-cover rounded border"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-900">Nenhuma foto de anomalia</p>
              )}
            </div>

            <div>
              <label className="font-medium text-gray-700">Observações:</label>
              <p className="text-gray-900">{checklist.obs || 'Nenhuma observação'}</p>
            </div>

            <div>
              <label className="font-medium text-gray-700">Sync Status:</label>
              <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                checklist.syncStatus === 'synced' ? 'bg-green-100 text-green-800' :
                checklist.syncStatus === 'syncing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {checklist.syncStatus ? formatSyncStatus(checklist.syncStatus) : 'N/A'}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Nenhum checklist disponível</p>
        )}
      </div>

      {/* Conferências */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📊 Conferências</h2>
        {conferencias && conferencias.length > 0 ? (
          <div className="space-y-4">
            {conferencias.map((conferencia, index) => (
              <div key={index} className="border rounded-lg p-4">
                <pre className="text-sm text-gray-900 whitespace-pre-wrap">
                  {JSON.stringify(conferencia, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma conferência disponível</p>
        )}
      </div>

      {/* Anomalias */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">⚠️ Anomalias</h2>
        {anomalias && anomalias.length > 0 ? (
          <div className="space-y-4">
            {anomalias.map((anomalia, index) => (
              <div key={index} className="border rounded-lg p-4">
                <pre className="text-sm text-gray-900 whitespace-pre-wrap">
                  {JSON.stringify(anomalia, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma anomalia disponível</p>
        )}
      </div>

      {/* Visualização Raw (para debug) */}
      <details className="bg-gray-100 rounded-lg p-4">
        <summary className="cursor-pointer font-medium text-gray-700">
          🔍 Visualização Raw (Debug)
        </summary>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Demanda:</h3>
            <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-60">
              {JSON.stringify(demanda, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Checklist:</h3>
            <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-60">
              {JSON.stringify(checklist, null, 2)}
            </pre>
          </div>
        </div>
      </details>
    </div>
  )
}