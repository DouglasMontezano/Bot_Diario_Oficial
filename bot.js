const puppeteer = require('puppeteer');
const nome='Zélia Fonseca';


(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // Navigate the page to a URL
  // await page.goto('https://portal.doe.sea.sc.gov.br/v165/#/buscar-materia');
  await page.goto('https://portal.doe.sea.sc.gov.br/v206/#/portal/edicao/buscar-publicacao');

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
        console.log(selector);
      //  } while(selector !='CdpElementHandle { handle: CdpJSHandle {} }' && cont < 4);  
       } while(cont < 4);  

// ==================================================================================================
      // const searchResultSelector1 = '.pi-chevron-right';
      // await page.waitForSelector(searchResultSelector1);  
      // await page.click(searchResultSelector1);    
      
      // const searchResultSelector2 = '.pi-chevron-right';
      // await page.waitForSelector(searchResultSelector2);  
      // await page.click(searchResultSelector2);  

      // const searchResultSelector3 = '.pi-chevron-right';
      // await page.waitForSelector(searchResultSelector3);  
      // await page.click(searchResultSelector3);           

      // const searchResultSelector4 = '.pi-chevron-right';
      // await page.waitForSelector(searchResultSelector4);  
      // await page.click(searchResultSelector4);
// ==================================================================================================
// open the publication at the last node .pi-book
  const searchResultSelector8 = '.pi-book';
  await page.waitForSelector(searchResultSelector8);  
  await page.click(searchResultSelector8);
  console.log("clicou no edital");
// ===================================================================================================
      
      // click the download button
              // const searchResultSelector9 ='.p-button-warning';
              // await page.waitForSelector(searchResultSelector9);  
              // await page.click(searchResultSelector9);       
              // await page.keyboard.press('Control');
              // await page.keyboard.press('Tab');
     
// ===================================================================================================           
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
 // await browser.close();
})();