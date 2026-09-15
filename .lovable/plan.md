# Agendamento somente pelo WhatsApp

## Resultado
- Todos os botões de agendamento abrirão uma conversa com Débora no WhatsApp, com uma mensagem pronta.
- A página `/agendar` deixará de ter calendário, horários e formulário; manterá apenas uma apresentação curta e o botão do WhatsApp, preservando links antigos.
- O rodapé não exibirá mais o acesso administrativo.

## Remoções
- Retirar o painel de agendamentos e suas telas de acesso.
- Remover do banco os agendamentos, horários comerciais, bloqueios e serviços usados exclusivamente pela agenda.
- Remover consultas, validações e funções da agenda que não serão mais utilizadas.

## Verificação
- Conferir no celular e no computador que os principais botões abrem o número correto com a mensagem de agendamento.
- Confirmar que o site carrega sem erros e que nenhum formulário ou lista de agendamentos permanece acessível.

## Detalhes técnicos
- Manter `/agendar` como página pública simples para não quebrar links já divulgados.
- Aplicar a remoção do banco em uma migração reversível por histórico, sem alterar outras áreas do site.
