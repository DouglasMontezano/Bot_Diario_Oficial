const puppeteer = require('puppeteer');
const nome='Zélia Fonseca';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // Navigate the page to a URL
  // await page.goto('https://portal.doe.sea.sc.gov.br/v165/#/buscar-materia');//link antigo
  // await page.goto('https://portal.doe.sea.sc.gov.br/v172/#/portal/edicao/buscar-publicacao');
  await page.goto('https://portal.doe.sea.sc.gov.br/v174/#/portal/edicao/buscar-publicacao');


  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

//   // Type into search box
  await page.type('.p-inputtext', nome);
  await page.keyboard.press('Enter');

 // Wait and click on first result
      selector = await page.waitForSelector(".pi-chevron-right");           
      searchResultSelector = '.pi-chevron-right';     
      cont=0;
      do{        
        selector = await page.waitForSelector(searchResultSelector);
        await page.click(searchResultSelector);
        cont= cont+1;
        console.log(cont); 
        // Tentativa de verificar a inezistência do último elemto para interromper o loop, posteriormente interrompi o loop com 5 repetições
        //  } while(selector !='CdpElementHandle { handle: CdpJSHandle {} }');         
       } while(cont < 5);  

// open the publication at the last node .pi-book
  const searchResultSelector8 = '.pi-book';
  await page.waitForSelector(searchResultSelector8);  
  await page.click(searchResultSelector8);
  console.log("clicou no edital");
        
// screenshot
  await page.screenshot({path:'do.png'});
// ===================================================================================================
// Locate the full title with a unique string
  const textSelector = await page.waitForSelector('.font-bold');
  // console.log(textSelector);
  const fullTitle = await textSelector?.evaluate(el => el.textContent);
// ===================================================================================================
//   Print the full title
  console.log('Resultado correspondente "%s".', fullTitle);
  await browser.close();
})();