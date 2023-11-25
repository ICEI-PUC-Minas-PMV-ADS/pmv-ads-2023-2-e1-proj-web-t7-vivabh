# Programação de Funcionalidades

Este projeto segue a arquitetura MVC (Model-View-Controller) para organizar e estruturar o código. As pastas estão organizadas da seguinte maneira:


![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/87d0894b-d955-4810-83ce-8be54ea4b691)




- assets: Contém os recursos estáticos do projeto, como imagens, fontes e outros arquivos necessários para a interface.

- css: Armazena os arquivos de estilo da aplicação. Aqui, você encontrará todos os estilos necessários para a apresentação da interface.

- js: A pasta principal para o código JavaScript, dividida em subpastas e arquivos específicos.

  - controllers: Contém os controladores da aplicação. Cada controlador é responsável por gerenciar as interações do usuário e atualizar os modelos e as visões correspondentes.

  - model: Armazena os modelos da aplicação. Os modelos representam o estado e a lógica de dados da aplicação.

  - repositories: Esta pasta contém os repositórios, que são responsáveis por interagir com fontes de dados externas, como APIs.

  - services: Inclui serviços auxiliares que não se encaixam diretamente no modelo, visão ou controlador, mas oferecem funcionalidades comuns ou utilitárias.

  - app.js: O ponto de entrada da aplicação JavaScript. Aqui, ocorre a inicialização do aplicativo e a configuração inicial.

  - helpers.js: Contém funções de auxílio que podem ser usadas em diferentes partes da aplicação.

  - initialData.js: Fornece dados iniciais JavaScriptque podem ser necessários durante a inicialização da aplicação.

- public/assets: Esta pasta serve como o diretório público acessível diretamente. Aqui, ficam os recursos estáticos que podem ser acessados diretamente pelo navegador.

- views: Armazena os arquivos HTML que representam as diferentes visualizações da aplicação. 

- index.html: O ponto de entrada da aplicação. Este arquivo HTML inclui os scripts JavaScript e folhas de estilo necessários, além de fornecer a estrutura básica da página.



Esta estrutura visa separar as responsabilidades da aplicação, facilitando a manutenção, escalabilidade e compreensão do código. O padrão MVC ajuda a organizar o código de maneira lógica, promovendo a modularidade e a reusabilidade.






![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/d59dc99c-ad67-4433-ad4b-1a75d4235b63)





## Tela inicial


![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/b5c4611e-bc22-43a6-89c8-55c78d1f5a0d)


- Possue seção de eventos da semana destaca as atividades mais relevantes que ocorrerão nos próximos sete dias.
Cada evento é acompanhado por uma breve descrição, data, hora e local.
Os usuários podem clicar nos eventos para obter mais detalhes 

- Possue seção dedicada aos eventos do mês proporciona uma visão mais abrangente das atividades planejadas para o mês corrente.
Os eventos podem ser organizados por data, categoria ou popularidade.
Navegação por Categorias:

- Possue navegador de categorias permite aos usuários filtrar eventos com base em interesses específicos.
Categorias podem incluir música, esportes, arte, tecnologia, entretenimento, e assim por diante. Essas categorias são salvas no localstorage, se o desenvolvedorees do projeto quiserem adicionar mais cateogorias é apenas salvar mais cateogrias no localstorage e ele aparecera na pagina inicial tambem

#### Requisito atendido

- RF-01: Listar eventos anuais, separados por datas.
- RF-02	Recomendar eventos similares.
- RNF-02	Responsividade
- RNF-03	Facilidade de aprendizado
- RNF-04	LGBD (Lei Geral de Proteção de Dados)

#### Artefatos da funcionalidade

- views/home.html

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/3d80008b-e090-45a4-a08c-4a60891bdcce)

- js/controllers/eventsController.js
  
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/4302523e-02ff-4bf3-a9fa-53fc4c27c36e)

- js/model/Event.js
  
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/bba4a2a7-4930-44b0-b382-170657501f90)

- js/model/Cateory.js
  
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/5396d931-3ed3-4240-b346-4b66a8ad719d)

- js/controllers/uiController.js

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/2b4f4dfa-f418-42f4-8320-ae062ae695fd)



#### Instruções de acesso

- Acessar https://viva-bh.vercel.app/ 


#### Responsável

- Igor Fonseca Amorim
- João Pedro Menezes Matias da Silva
- Luiz Fernando de Almeida Dias


### Tela de pesquisar eventos
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/bec67b05-45b7-4b49-a79c-0858466bd290)


### Filtragem de eventos
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/2ffae596-35ae-4718-a7b5-96f611ae2d97)


### Login

### Criar conta
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/e8a4cf22-aed1-4def-ae36-7a018dc459ac)


### Criar evento
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/3e027393-70f8-41ba-940d-64b4ea643af5)


### Exlcuir evento
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/e182b62d-a01d-42a5-9f0e-0906385b6f80)


### Editar evento
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/ea7de332-1a9b-428d-869d-a72d73df347c)


### Ver detalhes do evento
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-vivabh/assets/36000474/ff04b572-c976-494b-bba0-6948b97ce4e8)



 
