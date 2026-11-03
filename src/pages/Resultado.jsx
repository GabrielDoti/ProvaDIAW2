import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularTotalVotos,
  calcularResultado,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Apagar todos os votos?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <section className="pagina">
      <h1>Resultado</h1>

      {total === 0 ? (
        <div>
          <p>Ainda não há votos.</p>
          <Link to="/votacao">Ir para a votação</Link>
        </div>
      ) : (
        <div>
          <p>Total de votos: {total}</p>

          {resultado.map((p, indice) => (
            <div
              key={p.id}
              className={indice === 0 ? 'placar placar-lider' : 'placar'}
            >
              <h3>
                {p.nome}
                {indice === 0 && <span className="selo-lider">Sairia hoje</span>}
              </h3>

              <div className="barra">
                <div
                  className="barra-preenchida"
                  style={{ width: `${p.percentual}%` }}
                ></div>
              </div>

              <p>
                {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}
                % ({p.votos} {p.votos === 1 ? 'voto' : 'votos'})
              </p>
            </div>
          ))}

          <button type="button" onClick={handleZerar}>
            Zerar votação
          </button>
        </div>
      )}
    </section>
  );
}

export default Resultado;
