Overview

Ao longo do curso vamos desenvolver uma variação do UBER, onde um motorista pode se cadastrar para fazer corridas para passageiros.

Funcionamento (em linhas gerais, ao longo do projeto mais detalhes serão informados)

O passageiro se cadastra na plataforma fornecendo seu nome, email e cpf.
O motorista se cadastra na plataforma fornecendo seu nome, email, cpf e a placa do carro.
Inicialmente ambos devem ter avaliação igual a 5 e número de corridas igual a 0.
Após cada corrida a avaliação e o número de corridas de cada um é atualizado.
O motorista pode estar no status: fora de serviço, ocupado ou disponível.
O passageiro vai digitar as coordenadas de origem e de destino e solicitar a corrida.
O motorista pode visualizar os dados da corrida e aceitá-la. Após aceitá-la, o passageiro aguarda pelo motorista. 
Ao chegar, o motorista inicia a corrida e durante a corrida o trajeto vai sendo atualizado com os trechos percorridos, atualizando também o preço.
No final o motorista finaliza a corrida e o pagamento é processado.
O motorista pode avaliar o passageiro depois da corrida ser finalizada.
O passageiro pode avaliar o motorista depois da corrida ser finalizada.

Projeto - Parte 1 (Aula 1)

Use case : Calcular o preço da corrida

	url: /calculate_ride_price
	method: "post"
	input: distance, date
	output: price

Projeto - Parte 2 (Aula 2)

Use case: Cadastrar passageiro

	url: /passengers
	method: POST
	input: name, email e document
	output: passenger_id (uuid)

Use case: Cadastrar motorista

	url: /drivers
	method: POST
	input: name, email, document e car plate
	output: driver_id (uuid)

O documento, do tipo cpf, deve ser validado utilizando o algoritmo fornecido, que deve ser refatorado.

Crie uma API REST para receber as requisições e utilize um banco de dados de sua preferência para persistir os dados.

Criar os testes de integração (pelo menos)