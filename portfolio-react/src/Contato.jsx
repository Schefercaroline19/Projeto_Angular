import { useState } from 'react';

// Contato: o formulario de contato do Portfolio.
function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [aviso, setAviso] = useState('');

  // enviar: roda quando o formulario e enviado. Por enquanto so avisa e limpa os campos.
  function enviar(e) {
    e.preventDefault();
    setAviso('Obrigado, ' + nome + '! Mensagem com ' + mensagem.length + ' caracteres, pronta para envio.');
    setNome('');
    setEmail('');
    setMensagem('');
  }

  return (
    <section className="contato">
      <h2>Contato</h2>
      <form onSubmit={enviar}>
        <label>
          Seu nome
          <input name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Seu e-mail
          <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Sua mensagem
          <textarea name="mensagem" value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
        </label>
        <button type="submit">Enviar</button>
      </form>
      <p>Olá, {nome}! Sua mensagem tem {mensagem.length} caracteres.</p>
      <p className="aviso">{aviso}</p>
    </section>
  );
}

export default Contato;