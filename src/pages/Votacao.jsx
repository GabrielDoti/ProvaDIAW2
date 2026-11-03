import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import {
  listarNaRoca,
  listarForaDaRoca,
  registrarVoto,
} from '../services/votacaoService';

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votosNaSessao, setVotosNaSessao] = useState(0);

  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setVotosNaSessao(votosNaSessao + 1);
  }

  return (
    <section className="pagina">
      <h1>Votação</h1>
      <p>Quem você quer eliminar da roça?</p>

      {ultimoVoto !== null && (
        <div className="confirmacao">
          <p>
            Você votou em {ultimoVoto.nome}.
          </p>
          <p>
            Você já votou {votosNaSessao} {votosNaSessao === 1 ? 'vez' : 'vezes'}.
          </p>
          <Link to="/resultado">Ver resultado</Link>
        </div>
      )}

      <h2>Na Roça</h2>
       <div className="grade-roca">
        {naRoca.map((p) => (
          <ParticipanteCard key={p.id} participante={p} onVotar={handleVotar} />
        ))}
      </div>

      <h2>Demais peões</h2>
      <div className="grade-peoes">
        {foraDaRoca.map((p) => (
          <ParticipanteCard key={p.id} participante={p} />
        ))}
      </div>
    </section>
  );
}

export default Votacao;