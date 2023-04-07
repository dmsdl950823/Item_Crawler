const colors = require('./components/logcolors')
const catetories = require('./components/categories')

const puppeteer = require('puppeteer')

const fs = require('fs')
const fastcsv = require('fast-csv')
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout })



async function init () {
  console.log(`${colors.bgYellow}     >>> Browser Start! <<<    `, colors.reset)

  const browser = await puppeteer.launch({
    headless: false,
    // https://free-proxy-list.net/ (프록시서버)
    // args: ['--proxy-server=47.243.135.104:8080', '--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'],
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1020,890','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'],
    slowMo: 30,
  })

  return run(browser)
}

async function run (browser) {
  try {
    const page = await browser.newPage() // 크롬 브라우저의 탭 하나 생성
    // await page.setDefaultNavigationTimeout(0)
    
    // https://www.tabnine.com/code/javascript/functions/puppeteer/Page/waitForSelector :: 참고 문헌
    // https://ourcodeworld.com/articles/read/1106/how-to-solve-puppeteer-timeouterror-navigation-timeout-of-30000-ms-exceeded :: timeout 관련 문헌
    await page.setViewport({ width: 1020, height: 890 })
    await page.goto('https://naver.com', { waitUntil: 'load', timeout: 0 })
  

    const naver_id = "dmsdl950823"
    const naver_pw = "Ferrari500!"
  
    await page.goto('https://nid.naver.com/nidlogin.login')

    await page.evaluate((id, pw) => {
      document.querySelector('#id').value = id;
      document.querySelector('#pw').value = pw;
    }, naver_id, naver_pw)
    
    
    // 로그인
    await page.waitForTimeout(1000)
    await page.click('.btn_login')
    await page.waitForNavigation()


    // 카페 이동
    await page.goto('https://cafe.naver.com/mkas1')
    await page.waitForSelector('#topLayerQueryInput')

    // 작성자 검색
    const writer = '행크알리미'
    
    
    // 검색시작
    await page.type('#topLayerQueryInput', writer)
    await page.click('#cafe-search button')

    const mainArea = await page.waitForSelector('#main-area > iframe') // iframe 안에 있음
    const frame = await mainArea.contentFrame()
    await frame.waitForSelector('.result-board')
  
    // console.log(frame)

    // 작성자 검색 결과 테이블 확인
    const trs = await frame.$$('.result-board tr')
    let found = false // 찾았는지 여부 저장

    // 검색 결과 테이블을 확인하면서 찾고자하는 작성자와 이름이 일치하는지 확인
    for (let i = 0; i < trs.length; i++) {
      const tr = trs[i]

      // 각 td의 이름 확인
      const tds = await tr.$$('td.td_name')
      
      for (let j = 0; j < tds.length; j++) {
        const td = tds[j]

        // 작성자와 일치하는 행(row) 찾기
        const name = await td.$eval('td', el => el.textContent)
        if (name === writer) {
          // 찾았다면 작성자의 [게시글보기] 클릭    
          await td.click('a')
          await frame.waitForSelector('.perid-layer')

          await frame.click('.perid-layer ul > li:first-child')
          // await frame.waitForNavigation()
          // await frame.waitForSelector('.article-board')
          console.log(frame)

          // 게시글 모음 이동
          const trs2 = await frame.$$('.article-board tr')

          console.log(trs2)
          found = true
          break
        }
      }
    }

    // 작성자를 찾지 못했다면 아웃
    // console.log(found ? '찾음' : '없음')
    if (!found) return

    // if (!found) return browser.close()
  } catch (error) {
    console.error(error)
    // await browser.close()
  }
}

init()