const colors = require('./components/logcolors')

const puppeteer = require('puppeteer')

const fs = require('fs')
const fastcsv = require('fast-csv')
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout })


// const question = request => {
//   return new Promise((resolve, reject) => {
//     readline.question(request, answer => {
//       userInfo.push(answer)
//       resolve()
//     })
//   })
// }

// const userInfo = []
const userInfo = ['dmsdl950823', 'Ferrari500!']

// const main = async () => {
//   await question('@@ 사용자 이름', question)
//   await question('@@ 사용자 비밀번호', question)


//   forPuppeteerWithPage(pageCount)
//   readline.close()
// }

// main()

gotohome()


/**
 * Pupeteer 시작
 */
async function init () {
  try {
    console.log(`${colors.bgBlue}     >>> Browser Start! <<<    `, colors.reset)
    // console.log('pupeteer', puppeteer)

    const browser = await puppeteer.launch({
      headless: false,
      // https://free-proxy-list.net/ (프록시서버)
      // args: ['--proxy-server=47.243.135.104:8080', '--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'],
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1020,890','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'],
      slowMo: 30,
    })

    const page = await browser.newPage() // 크롬 브라우저의 탭 하나 생성
    // await page.setDefaultNavigationTimeout(0)

    
    /* 페이지 이동 */
    // https://www.tabnine.com/code/javascript/functions/puppeteer/Page/waitForSelector :: 참고 문헌
    // https://ourcodeworld.com/articles/read/1106/how-to-solve-puppeteer-timeouterror-navigation-timeout-of-30000-ms-exceeded :: timeout 관련 문헌
    const destination = 'https://www.naver.com/'
    await page.setViewport({ width: 1020, height: 890 })
    await page.goto(destination, { waitUntil: 'load', timeout: 0 })
  
    /* 로그인 시작 */
    // await page.click('#account .link_login');
    // await page.waitForNavigation();

    // // 로그인 페이지 > 로그인 정보 입력
    // const id = await page.$$('#id')
    // const pw = await page.$$('#pw')

    // console.log(id)
    // console.log(pw)


    /* 네이버 카페 */
    const cafe = 'https://cafe.naver.com/mkas1'
    await page.goto(cafe, { waitUntil: 'load', timeout: 0 })

    await page.click('#topLayerQueryInput') // 검색창 입력
    // await page.waitForSelector('#snsLinks')


    // await page.goto('https://naver.com');

    await page.screenshot({ path: 'naver.png', fullPage:true });

    return

  } catch (error) {
    console.error(error)
  }
}


/**
 * 네이버 홈페이지 이동
 */
async function gotohome () {

}

// 크롤러 (페이지만 입력하는 방식) ✅
const forPuppeteerWithPage = async (innerpagecnt = 1) => {
  console.log(`${colors.bgBlue}     >>> Browser Start! <<<    `, colors.reset)
  let csv = saveWithCSVFile() // 일단 파일부터 저장하기

  // console.log('pupeteer', puppeteer)
  
  // [물품 정보 저장] ✅
  const result = []

  const browser = await puppeteer.launch({
    headless: false,
    // https://free-proxy-list.net/ (프록시서버)
    // args: ['--proxy-server=47.243.135.104:8080', '--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'],
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1020,890','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'],
    slowMo: 30,
  })

  try {
    const page = await browser.newPage() // 크롬 브라우저의 탭 하나 생성
    // await page.setDefaultNavigationTimeout(0)
    
    // https://www.tabnine.com/code/javascript/functions/puppeteer/Page/waitForSelector :: 참고 문헌
    // https://ourcodeworld.com/articles/read/1106/how-to-solve-puppeteer-timeouterror-navigation-timeout-of-30000-ms-exceeded :: timeout 관련 문헌
    await page.setViewport({ width: 1020, height: 890 })
    await page.goto('https://www.naver.com/', { waitUntil: 'load', timeout: 0 })
  
    await page.evaluate((id, pw) => {
      document.querySelector('#id').value = id;
      document.querySelector('#pw').value = pw;
    }, userInfo[0], userInfo[1]);


    await page.click('#account .link_login');
    await page.waitForNavigation();

    // await page.goto('https://naver.com');

    await page.screenshot({ path: 'naver.png', fullPage:true });

    return





  } catch (error) {
    console.error(error)
  }
}

return init()