import React from 'react';
import './App.css';

const IconClock = () => <span role="img" aria-label="clock">⏱️</span>;
const IconTarget = () => <span role="img" aria-label="target">🎯</span>;

// DADOS DE MISSÃO GAMMA 
const RELATORIO_DA_S_3 = {
  piloto: 'Capitão Lucas Leite',
  setorAlvo: 'Cinturão de Kuiper (Setor 7)',
  dadosNavegacao: {
    nomeDestino: 'Base Ceres',
    tipoClima: 'Tempestade de Gelo',
    velocidade: 'Warp 3.5',
    descricao: 'Zona de detritos e gelo, exige cautela e escudo máximo.',
  },
  estadoMissao: {
    completo: 62,
    mensagem: 'Manter velocidade de cruzeiro. Escudo frontal em 95%.',
    prioridade: 'MEDIA',
  },
  leiturasDoSistema: {
    Magnetosfera: '1.1 Tesla (Marginal)',
    Plasma: 'Alta densidade (Nível Vermelho)',
    EstabilidadeCronal: 'Anomalia detectada (0.01%)',
  },
  log: [
    { codigo: 'LOG-005', info: 'Calibração dos canhões de íons.', data: '01/10/25' },
    { codigo: 'LOG-006', info: 'Desvio de rota para evitar detritos não mapeados.', data: '02/10/25' },
    { codigo: 'LOG-007', info: 'Reajuste do balanceamento do sistema de propulsão.', data: '03/10/25' },
  ]
};

// FUNÇÃO DE FORMATO
const formatarDataGalactica = (nomeAlvo) => {
  const agora = new Date();
  const tempoGalactico = agora.toLocaleTimeString('pt-BR', { hour12: false }); 
  const dataGalactica = agora.toLocaleDateString('pt-BR');
  return `ALVO: ${nomeAlvo} // ${dataGalactica} ${tempoGalactico} GTM`;
};

// COMPONENTE PAINEL DE DADOS
const DataPanelGamma = ({ title, value, unit, isAlert }) => {
  const colorClass = isAlert ? 'text-pink-gamma' : 'text-lime-gamma';
  const shadowClass = isAlert ? 'shadow-pink-gamma' : 'shadow-lime-gamma';

  return (
    <div className={`data-panel-gamma`}>
      <p className="title-gamma">{title}</p>
      <div className={`value-gamma ${colorClass} ${shadowClass}`}>
        {value}
        <span className="unit-gamma">{unit}</span>
      </div>
    </div>
  );
};

// COMPONENTE PRINCIPAL DASHBOARD GAMMA
export default function DashboardGamma() {
  const data = RELATORIO_DA_S_3;

  const alertCondition = data.estadoMissao.prioridade === 'MEDIA' || data.leiturasDoSistema.Plasma.includes('Vermelho');

  const missionBar = (
    <div className="mission-bar-gamma">
      <div 
        className={`mission-bar-fill-gamma ${alertCondition ? 'alert-fill-gamma' : 'normal-fill-gamma'}`}
        style={{ width: `${data.estadoMissao.completo}%` }}
      ></div>
      <span className="mission-percent-gamma">{data.estadoMissao.completo}% COMPLETO</span>
      <span className={`mission-message-gamma ${alertCondition ? 'alert-text' : 'normal-text'}`}>
        {data.estadoMissao.mensagem.substring(0, 30)}...
      </span>
    </div>
  );

  const systemReadings = (
    <div className="system-readings-grid-gamma">
      {Object.entries(data.leiturasDoSistema).map(([key, value]) => {
        const isReadingAlert = value.includes('Vermelho') || value.includes('Anomalia');
        return (
          <div key={key} className={`reading-item-gamma ${isReadingAlert ? 'alert-reading' : 'normal-reading'}`}>
            <p className="reading-key-gamma">{key}</p>
            <p className={`reading-value-gamma ${isReadingAlert ? 'text-pink-gamma' : 'text-lime-gamma'}`}>
              {value.split('(')[0].trim()}
            </p>
          </div>
        );
      })}
    </div>
  );

  const destinationInfo = (
    <div className="destination-info-gamma">
        <h4 className="destination-title-gamma"><IconTarget /> {data.dadosNavegacao.nomeDestino}</h4>
        <p className="destination-desc-gamma">{data.dadosNavegacao.descricao}</p>
        <div className="destination-details-gamma">
            <p>Velocidade: <span className="speed-gamma">{data.dadosNavegacao.velocidade}</span></p>
            <p>Clima: <span className={`weather-gamma ${data.dadosNavegacao.tipoClima.includes('Tempestade') ? 'text-pink-gamma' : 'text-lime-gamma'}`}>{data.dadosNavegacao.tipoClima}</span></p>
        </div>
    </div>
  );

  const commandLog = (
    <div className="command-log-gamma">
        <h4 className="log-header-gamma">LOG S-3 / {data.piloto}</h4>
        <ul className="log-list-gamma custom-scrollbar-gamma">
            {data.log.map((entry, index) => (
                <li key={index} className="log-item-gamma">
                    <span className="log-code-gamma">[{entry.codigo}]</span>
                    {entry.info}
                </li>
            ))}
        </ul>
    </div>
  );

  return (
    <div className="dashboard-gamma-container">
        <div className="dashboard-gamma">
            <header className="header-gamma">
                <div className="header-content-gamma">
                <h1 className="titulo-gamma">INTERCEPTADOR GAMMA</h1> 
                <p className="piloto-gamma">Piloto: <span className="nome-piloto-gamma">{data.piloto}</span></p>
                </div>
                <p className="data-hora-gamma">
                <IconClock />
                {formatarDataGalactica(data.setorAlvo)}
                </p>
            </header>

            <main className="main-content-gamma">
                {missionBar}
                
                <div className="data-panels-grid-gamma">
                    <DataPanelGamma title="Prioridade Atual" value={data.estadoMissao.prioridade} unit="" isAlert={alertCondition} />
                    <DataPanelGamma title="Setor de Alvo" value={data.setorAlvo.split('(')[0].trim()} unit="" isAlert={false} />
                </div>
                
                {destinationInfo}
                
                <h3 className="system-readings-title-gamma">Leituras do Sistema</h3>
                {systemReadings}

                {commandLog}
            </main>
        </div>
    </div>
  );
}