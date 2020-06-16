# EC-Website
Website da turma de engenharia da computação do período 2019.1 do centro de informática da UFPE.  
  
## Instalação
Para a instalação do projeto em sua máquina, é necessário apenas que entre na pasta do projeto pelo terminal e digite npm install ou npm i pois todas as dependências já estão listadas no arquivo package.json.  
  
## Modo de desenvolvedor
Para acessar o projeto no modo de desenvolvedor é necessário entrar na pasta do projeto pelo terminal e digitar **npm run dev**, com isso um servidor será aberto na porta 8080 da sua máquina e o projeto será disponibilizado nela. O projeto, quando em modo de desenvolvedor, analisa as alterações de código feitos na página **src** e atualiza automaticamente, sem a necessidade de recarregar o servidor. 
###### Observações:
- Caso deseje, para modificar a porta em que o servidor de desenvolvimento, basta altera-la no arquivo *gulpfile.js*;
- Tanto no modo de desenvolvedor quanto no modo de produção a pasta **build** é gerada;  
  
## Modo de produção
Para acessar o modo de produção é necessário entrar na pasta do projeto pelo terminal e digitar **npm run build**, com isso a pasta **build** será disponibilizada.
