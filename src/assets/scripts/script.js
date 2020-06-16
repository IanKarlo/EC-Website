function adjustClassesByWindowSize() {
  if ($(window).width() > 470) {
    $(".heading")
      .addClass("display-3")
      .removeClass("display-4");
  } else {
    $(".heading")
      .addClass("display-4")
      .removeClass("display-3");
  }
  if ($(window).width() < 675) {
    $(".changeMargin-4")
      .addClass("m-1")
      .removeClass("m-4");
    $(".changeMargin-5")
      .addClass("m-2")
      .removeClass("m-5");
  } else {
    $(".changeMargin-4")
      .addClass("m-4")
      .removeClass("m-1");
    $(".changeMargin-5")
      .addClass("m-5")
      .removeClass("m-2");
  }
}

function createTableOfDates(destination) {
  const dest = document.querySelector(`#${destination}`);
  if (!dest) return;

  const prazos = [
    {
      data: "06/04/2020",
      cadeira: "Cálculo 3 - Prova"
    },
    {
      data: "08/04/2020",
      cadeira: "Física 2 - Prova"
    },
    {
      data: "05/05/2020",
      cadeira: "Infraestrutura de Hardware - Prova"
    }
  ];

  const table = $("<table></table>").addClass([
    "table",
    "table-dark",
    "table-striped",
    "table-bordered"
  ]);
  const thead = $(`
    <thead>
      <tr>
        <th scope="col">Data</th>
        <th scope="col">Cadeira</th>
      </tr>
    </thead>`);
  const caption = $("<caption></caption>").html("Datas e Prazos");
  const tbody = $("<tbody></tbody>");
  const rows = [];
  for (let prazo of prazos) {
    rows.push(
      $(`
        <tr>
          <td>${prazo.data}</td>
          <td>${prazo.cadeira}</td>
        </tr>
      `)
    );
  }
  tbody.append(rows);
  table.append(caption, thead, tbody);
  $(dest).append(table);
}

function createLinkTable(card) {
  const table = $(`
      <table class="table striped-table">
        
      </table>
      `);
  const tbody = $(`
      <tbody>
      </tbody>
      `);
  const rows = [];
  if (!card.links) {
    console.log(card);
    return null;
  }
  for (let link of card.links) {
    rows.push(
      $(`
        <tr>
          <th scope="row">
            <a href="${link.url}" target="_blank">
              <i class="fa fa-${link.type}"></i> ${link.name}
            </a>
          </th>
        </tr>
        `)
    );
  }
  for (let book of card.books) {
    rows.push(
      $(`
        <tr>
          <th scope="row">
            <a href="${book.url}" target="_blank">
              <i class="fa fa-${book.type}"></i> ${book.name}
            </a>
          </th>
        </tr>
        `)
    );
  }
  for (let photo of card.photos) {
    rows.push(
      $(`
        <tr>
          <th scope="row">
            <a href="${photo.url}" target="_blank">
              <i class="fas fa-images"></i> ${photo.name}
            </a>
          </th>
        </tr>
        `)
    );
  }
  tbody.append(rows);
  table.append(tbody);
  return table;
}

function createGradeCard(card, number) {
  const tittleCard = $(`
    <div class="card-header" id="subHeading${card.number}">
      <h5 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#subCollapse${
          card.number + number
        }" aria-expanded="true" aria-controls="subCollapse${card.number}">
          <i class="fa fa-${card.type}"></i> ${card.name}
        </button>
      </h5>
    </div>
    `);
  const bodyCard = $(`
    <div id="subCollapse${
      card.number + number
    }" class="collapse" aria-labelledby="subHeading${
    card.number
  }" data-parent="#accordion${number}">
      <div class="card-body">
        <div id="list" class="mr-5" style="display: flex; justify-content: space-around;">    
        </div>
      </div>
    </div>
    `);
  const gradeCard = $(`
    <div class="card"> 
    </div>
    `);

  const table = createLinkTable(card);
  $($(bodyCard.children()[0]).children()[0]).append(table);
  gradeCard.append([tittleCard, bodyCard]);
  return gradeCard;
}

function createListOfSubLinks(card) {
  const items = [];
  for (let c of card.card) {
    items.push(createGradeCard(c, card.number));
  }
  const accordion = $(
    `<div class="accordion" id="accordion${card.number}"></div>`
  );
  accordion.append(items);
  return accordion;
}

function createSemesterCard(card) {
  const cardHeader = $(`
      <div class="card-header" id="heading${card.number}">
        <h5 class="mb-0">
          <button
            class="btn btn-link"
            type="button"
            data-toggle="collapse"
            data-target="#collapse${card.number}"
            aria-expanded="true"
            aria-controls="collapse${card.number}"
          >
            ${card.tittle}
          </button>
        </h5>
      </div>
    `);

  const cardBody = $(`
    <div
    id="collapse${card.number}"
    class="collapse"
    aria-labelledby="heading${card.number}"
    data-parent="#ExternDrawer"
  >
        <div class="card-body">
          <div class="m-4 changeMargin-4">
            </div>
        </div>
    </div>
    `);
  const items = createListOfSubLinks(card);
  $(cardBody.children()[0])
    .children()
    .append(items);
  const semesterCard = $('<div class="card"></div>');
  semesterCard.append([cardHeader, cardBody]);
  return semesterCard;
}

function createListOfLinks(destination) {
  const dest = document.querySelector(`#${destination}`);
  if (!dest) {
    return;
  }

  const cards = [
    {
      tittle: "Primeiro Período",
      number: "One",
      card: [
        {
          number: "One",
          name: "Algebra Vetorial Linear para Computação",
          type: "calculator",
          links: [
            {
              name: "Site/Professor",
              url: "https://www.cin.ufpe.br/~psgmn/AlgebraLinear/",
              type: "link"
            },
            {
              name: "Site da Monitoria",
              url: "https://www.cin.ufpe.br/~ma531/ec/",
              type: "link"
            }
          ],
          books: [
            {
              name: "Boldrini, Costa, Figueiredo, Wetzler",
              url:
                "https://drive.google.com/file/d/18O9EotP71bRkXsiI7jTj7mg4h6OJEhln/view",
              type: "book"
            },
            {
              name: "Anton, Rorres",
              url:
                "https://drive.google.com/file/d/1oorvTnq49yGuEG56AK-UJ2pk17PZc72j/view",
              type: "book"
            }
          ],
          photos: [
            {
              name: "Fotos",
              url:
                "https://photos.google.com/share/AF1QipPtH4QHpjih9AES6Xd4sGdAvrGfXSo536hLZYXXPaIFkyXf82INtKGQFAe4uHQ6dw?key=cXo0M1Jka25TNW94U3E4OVFKeTNZbGxELXpZMDB3",
              type: "photo"
            }
          ]
        },
        {
          number: "Two",
          name: "Cálculo 1",
          type: "calculator",
          links: [
            {
              name: "Site professor Gondim",
              url:
                "https://sites.google.com/site/matematicajoaogondim/calculo-1",
              type: "link"
            },
            {
              name: "Site professor Willikat",
              url: "https://sites.google.com/view/matematicawillikat",
              type: "link"
            },
            {
              name: "Mural digital da Área II",
              url:
                "https://drive.google.com/drive/folders/0Bz6vOaKzI4JlQU9pT3ZLRENLRzg",
              type: "link"
            },
            {
              name: "Videos de Ferreto",
              url:
                "https://www.youtube.com/playlist?list=PLTPg64KdGgYhACfQUtMf3CuhWOfLoTf_a",
              type: "link"
            }
          ],
          books: [
            {
              name: "Stewart",
              url:
                "https://drive.google.com/file/d/1n1-oq0FM_yR8PHLHGObX0ws2zoObrFfJ/view",
              type: "book"
            },
            {
              name: "Stewart - Resoluções",
              url:
                "https://drive.google.com/file/d/18rOIVw2MPPw3pN0t-ECer6yon2qmpJLu/view",
              type: "book"
            },
            {
              name: "Guidorizzi",
              url:
                "https://drive.google.com/file/d/1DyP_ZXDrK2ds1_BpcVuEj-M51OMRGzdj/view",
              type: "book"
            },
            {
              name: "Apostol",
              url:
                "https://drive.google.com/file/d/1ewiE4fJB3KF9t2elybctW7n6mrkcLM5H/view",
              type: "book"
            },
            {
              name: "Apostila de Limites e Derivadas",
              url:
                "https://www.cin.ufpe.br/~gamr/FAFICA/matematica/ApostilaLimiteDerivada.pdf",
              type: "book"
            }
          ],
          photos: [
            {
              name: "Fotos",
              url:
                "https://photos.google.com/share/AF1QipMfT_7HMm_m4M-fAR65AKb_wZ0n1ntV3XSJRdrmgLxiypUzdNzVQnk0PyYMsgHZvw?key=NnNweEp5VUFhUTdzRHNndkw3Y2lyWTI1enkwRWdn",
              type: "photo"
            }
          ]
        },
        {
          number: "Three",
          name: "Introdução à Computação",
          type: "laptop",
          links: [
            {
              name: "Site da Disciplina",
              url: "https://sites.google.com/cin.ufpe.br/introcomputacaoec",
              type: "link"
            },
            {
              name: "Simulador de Arduíno",
              url: "https://www.tinkercad.com/learn/circuits",
              type: "link"
            }
          ],
          books: [],
          photos: [
            {
              name: "Fotos",
              url:
                "https://photos.google.com/share/AF1QipMhoreeieKLw7_a-yiZMp8Mc9hCtS4wefzhn4uxmsi0ANw896Qa9sVl44YparpByg?key=T056TS1zdlBPY0RWS0lVU2M2bFpRQk9LREtwMzJ3",
              type: "images"
            }
          ]
        },
        {
          number: "Four",
          name: "Matemática Discreta",
          type: "calculator",
          links: [],
          books: [
            {
              name: "Rosen 6ª Edição",
              url:
                "https://drive.google.com/file/d/1zFYJtRfgkXrGvehCyR9w2rCQiIjlvaLZ/view",
              type: "book"
            },
            {
              name: "Rosen 7ª Edição",
              url:
                "https://drive.google.com/file/d/1OH0O7eHl3T3PtqBKD1RxM9P-WmlGD255/view",
              type: "book"
            },
            {
              name: "Graham, Knuth, Patashnik",
              url:
                "https://drive.google.com/file/d/1yjPNzp7fzLgJUQpHdSb6K2ZShP4aB2dd/view",
              type: "book"
            },
            {
              name: "Lovasz, Pelikan, Vesztergombi",
              url:
                "https://drive.google.com/file/d/1Hv_TM4VuHiyyAjnYkEhVIvhW-sNRz2Nr/view",
              type: "book"
            },
            {
              name: "Lovasz, Pelikan, Vesztergombi - Resoluções",
              url:
                "https://drive.google.com/file/d/1jNIRX6DRzOivyXrjvGu_D_80KKfapw-r/view",
              type: "book"
            }
          ],
          photos: [
            {
              name: "Fotos",
              url:
                "https://photos.google.com/share/AF1QipNyiRdnVVp-s_15uDr_sTGjVbtFEYl0PDrfrfnYyTtSf_DLW7TzG15fl-EYhuzxQQ?key=UzlrZm13dXBobEc3ckdQdEZDQzVXYUdpb3VtZlFn",
              type: "photo"
            }
          ]
        },
        {
          number: "Five",
          name: "Introdução à Programação",
          type: "laptop",
          links: [
            {
              name: "Site do Professor",
              url: "https://sites.google.com/a/cin.ufpe.br/if669ec/",
              type: "link"
            },
            {
              name: "Site da Monitoria",
              url: "https://valgueiro.github.io/SiteMonitoria/",
              type: "link"
            },
            {
              name: "Download Codeblocks(codeblocks-17.12mingw-setup.exe)",
              url: "http://www.codeblocks.org/downloads/26",
              type: "link"
            },
            {
              name: "Tutorial Allegro - 1",
              url: "https://www.aprendendoallegro.tk/jogo.php",
              type: "link"
            },
            {
              name: "Tutorial Allegro - 2",
              url: "http://www.rafaeltoledo.net/tutoriais-allegro-5/",
              type: "link"
            },
            {
              name: "Makefile projeto",
              url:
                "https://github.com/heitorado/projetoIP/blob/master/makefile",
              type: "link"
            },
            {
              name: "Curso de C",
              url: "https://neps.academy/course/5",
              type: "link"
            }
          ],
          books: [
            {
              name: "C - Como Programar, Deitel",
              url:
                "https://drive.google.com/file/d/1dKA-a_uswbfZ7uP2ksMHurrXXbyiEkkm/view",
              type: "book"
            },
            {
              name: "C Completo e Total, Schildt",
              url:
                "https://drive.google.com/file/d/1NpmDdFA4HFwJZYPYCrffaBQR3KvQoL2I/view",
              type: "book"
            },
            {
              name: "C For Engineers and Scientists, Bronson",
              url:
                "https://drive.google.com/file/d/1rp0CGDdiFJYWX1npv3toA7Q3rXd9bBRM/view",
              type: "book"
            },
            {
              name: "How to Solve it By Computer, Dromeyt",
              url:
                "https://drive.google.com/file/d/1Ljr_YgE5lWznpKv4-T4mW3I_AZ8Ne-Be/view",
              type: "book"
            }
          ],
          photos: [
            {
              name: "Fotos",
              url:
                "https://photos.google.com/share/AF1QipMhjUT5ld1Q2yjHYUdI9u9TiM0Vk3gFNAAK8s63m5pA7twZlYY8GQVcsDaQIFakBg?key=ZW00ODhVMWJxVHhtYmp3bENUR3Z0X2c2SWp6SlFn",
              type: "photo"
            }
          ]
        }
      ]
    },
    {
      tittle: "Segundo Período",
      number: "Two",
      card: [
        {
          number: "One",
          name: "Física Geral 1",
          type: "calculator",
          links: [
            {
              name: "Dropbox",
              url:
                "https://www.dropbox.com/sh/n2cjbp2n9n6xu1s/AAC3rIjhbqR2_G6XgKwl66_Xa?dl=0",
              type: "link"
            },
            {
              name: "Mural Digital da Área II",
              url:
                "https://drive.google.com/drive/folders/0Bz6vOaKzI4JlQU9pT3ZLRENLRzg",
              type: "link"
            },
            {
              name: "Área II",
              url: "https://www.ufpe.br/area-ii#",
              type: "link"
            },
            {
              name: "AVA",
              url: "https://ava.ufpe.br/graduacao/",
              type: "link"
            },
            {
              name: "Coleção Halliday",
              url:
                "https://drive.google.com/drive/folders/0B8gnfxVjcjVVRkhBWWtYdkFPYnc",
              type: "link"
            },
            {
              name: "Notas de aula do professor Mauro Copelli",
              url: "https://sites.google.com/site/fisica1maurocopelli/",
              type: "link"
            },
            {
              name: "Notas de aula do professor Leonardo Cabral",
              url: "https://sites.google.com/site/fisica120152dfufpe/",
              type: "link"
            },
            {
              name: "Notas de aula do professor Anderson Amaral",
              url: "https://amamaral.github.io/teaching/Fisica_1.html",
              type: "link"
            }
          ],
          books: [
            {
              name: "Halliday",
              url:
                "http://www.raiosv.com.br/wp-content/uploads/2013/10/7-F%C3%ADsica-1-Mec%C3%A2nica-Halliday-10%C2%AA-Edi%C3%A7%C3%A3o.pdf",
              type: "book"
            }
          ],
          photos: []
        },
        {
          number: "Two",
          name: "Sistemas Digitais",
          type: "laptop",
          links: [
            {
              name: "Site da Disciplina",
              url: "https://cin.ufpe.br/~agsf",
              type: "link"
            },
            {
              name: "Tutorial básico de Verilog",
              url:
                "https://www.cin.ufpe.br/~eaa3/Arquivos/Verilog/Tutorial%20Verilog.pdf",
              type: "link"
            },
            {
              name: "Provas/Slides/Notas de Aula",
              url: "https://www.cin.ufpe.br/~if675ec/",
              type: "link"
            }
          ],
          books: [],
          photos: []
        },
        {
          number: "Three",
          name: "Cálculo 2",
          type: "calculator",
          links: [
            {
              name: "Mural Digital da Área II",
              url:
                "https://drive.google.com/drive/folders/0Bz6vOaKzI4JlQU9pT3ZLRENLRzg",
              type: "link"
            },
            {
              name: "Site do professor Ricardo",
              url: "https://sites.google.com/view/ricardocalculo2",
              type: "link"
            }
          ],
          books: [
            {
              name: "Stewart Vol. 2",
              url:
                "http://sinop.unemat.br/site_antigo/prof/foto_p_downloads/fot_13018calculo_volume_2_stewabt_pdf_Calculo_Volume_2_Stewart.pdf",
              type: "book"
            }
          ],
          photos: []
        },
        {
          number: "Four",
          name: "Lógica",
          type: "calculator",
          links: [
            {
              name: "Site da Disciplina",
              url: "https://www.cin.ufpe.br/~if673/",
              type: "link"
            }
          ],
          books: [],
          photos: []
        },
        {
          number: "Five",
          name: "Algoritmos e Estruturas de Dados",
          type: "laptop",
          links: [
            {
              name: "Site da Disciplina",
              url: "https://sites.google.com/a/cin.ufpe.br/if672",
              type: "link"
            }
          ],
          books: [],
          photos: []
        }
      ]
    },
    {
      tittle: "Terceiro Período",
      number: "Three",
      card: [
        {
          number: "One",
          name: "Física Geral 2",
          type: "calculator",
          links: [
            {
              name: 'Site do Edmodo - S8(Código: "qjmteg")',
              url: "https://edmo.do/j/57ne4q",
              type: "link"
            }
          ],
          books: [
            {
              name: "Halliday",
              url:
                "https://mega.nz/#!30wzCJSK!5NrPc8AeNK4_c2wFjundnmLVSCI7h9g3c1zbl2Cgzlk",
              type: "book"
            },
            {
              name: "Halliday - Respostas",
              url:
                "https://mega.nz/#!71wXQBDZ!7Q4GmORmVA3Ulfqh4z4U3ST-gr8c2op4daK0O1W4Ijg",
              type: "book"
            }
          ],
          photos: []
        },
        {
          number: "Two",
          name: "Infraestrutura de Hardware",
          type: "laptop",
          links: [
            {
              name: "Site da Disciplina",
              url: "cin.ufpe.br/~if667",
              type: "link"
            }
          ],
          books: [
            {
              name: "Computer Organization and Design",
              url:
                "https://drive.google.com/open?id=1RHhV_VYui4gPaXMtTzNVZ8CUoZ2gHnFT",
              type: "book"
            },
            {
              name: "Computer Organization and Design (RISC-V)",
              url:
                "http://home.ustc.edu.cn/~louwenqi/reference_books_tools/Computer%20Organization%20and%20Design%20RISC-V%20edition.pdf",
              type: "book"
            }
          ],
          photos: []
        },
        {
          number: "Three",
          name: "Cálculo 3",
          type: "calculator",
          links: [
            {
              name: "Site do professor Willikat",
              url: "http://bit.ly/2IpEzrz",
              type: "link"
            },
            {
              name: "Site do professor Gondim",
              url: "https://bit.ly/2UL5HX5",
              type: "link"
            },
            {
              name: "Mural Digital da Área II",
              url:
                "https://drive.google.com/drive/folders/0Bz6vOaKzI4JlQU9pT3ZLRENLRzg",
              type: "link"
            }
          ],
          books: [],
          photos: []
        },
        {
          number: "Four",
          name: "Infraestrutura de Software",
          type: "laptop",
          links: [
            {
              name: "Site da Disciplina",
              url: "https://cin.ufpe.br/~if677ec/",
              type: "link"
            },
            {
              name: "Slide Assembly",
              url:
                "https://www.cin.ufpe.br/~aht/diversos/Lista%20assembly%20x86%20-%20Infra%20de%20Software/Monitoria%20-%20ASM.pdf",
              type: "link"
            }
          ],
          books: [
            {
              name: "A. S. Tanenbaum. Sistemas Operacionais Modernos",
              url:
                "https://drive.google.com/open?id=1lNo-sXFyKVBuLPGhqeD--vCpgscuD8wH",
              type: "book"
            },
            {
              name:
                "A. S. Tanenbaum e A. Woodhull. Sistemas Operacionais: Projeto e Implementação",
              url:
                "https://drive.google.com/open?id=13dyFtmQsDSD0awrMV3dz1-4LDvVG2vCp",
              type: "book"
            }
          ],
          photos: []
        },
        {
          number: "Five",
          name: "Informática e Sociedade",
          type: "laptop",
          links: [
            {
              name: 'Classroom(Código: "jah6gze")',
              url: "classroom.google.com",
              type: "link"
            }
          ],
          books: [],
          photos: []
        }
      ]
    }
  ];
  const items = [];
  for (let card of cards) {
    items.push(createSemesterCard(card));
  }
  $(dest).append(items);
}

$(document).ready(function() {
  (function() {
    function configureLinks() {
      document.querySelectorAll("[p-link]").forEach(link => {
        link.href = "#" + link.attributes["p-link"].value.substring(8);
      });
    }

    function ajaxNavigation(hash) {
      if (!hash) return;
      const link = document.querySelector(`[href="#${hash}"]`);
      if (!link) {
        console.log("error1");
        return;
      }
      //console.log(link.attr("p-link"));
      $.ajax(
        $(link)
          .attr("p-link")
          .substring(1)
      ).done(function(html) {
        $("[ajax-div]").html(html);
        createTableOfDates("my-table");
        createListOfLinks("ExternDrawer");
        adjustClassesByWindowSize();
      });
    }

    function initialScreen() {
      if (window.location.hash !== "") {
        ajaxNavigation(window.location.hash.substring(1));
      } else {
        const hash = $(document.querySelectorAll("[p-link]")[0])
          .attr("href")
          .substring(1);
        ajaxNavigation(hash);
      }
    }

    window.onhashchange = e =>
      ajaxNavigation(window.location.hash.substring(1));

    let start = async function() {
      await configureLinks();
      await initialScreen();
    };
    start();
    createTableOfDates("eoq");
  })();
});

window.addEventListener("resize", adjustClassesByWindowSize);
