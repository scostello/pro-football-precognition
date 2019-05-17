// @flow
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';
import massive from 'massive';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import convert from 'xml-js';

const db$ = Rx.from(massive({
  host: process.env.PG_HOST || 'db.pfa.test',
  port: process.env.PG_PORT || 30543,
  database: process.env.PG_DB_NAME || 'pro_football_analytics',
  user: process.env.PG_DB_USER || 'pfa_master',
  password: process.env.PG_DB_PASSWORD || 'mysecretpassword',
  poolSize: 5,
}));

const browser$ = Rx.from(puppeteer.launch());

const getTeamsHtml = page => page
  .goto('https://www.pro-football-reference.com/teams/')
  .then(() => page.$('#teams_inactive'))
  .then(handle => page.evaluate(activeTeams => activeTeams.outerHTML, handle));

const cleanHtml = (html) => {
  const $ = cheerio
    .load(html, { normalizeWhitespace: true, xmlMode: true });

  $('caption').remove();
  $('colgroup').remove();

  return $.xml();
};

const projectRaw = ([_db, _browser]) => Rx.from(
  _browser.newPage()
    .then(getTeamsHtml)
    .then(cleanHtml)
    .then(xml => ([xml, convert.xml2js(xml, { compact: true, ignoreComment: true, alwaysChildren: true })]))
    .then(([xml, json]) => _db
      .stage_pfr
      .scrape_jobs
      .insert({
        status: 'SUCCESSFUL',
        css_selector: '#teams_inactive',
        as_xml: xml,
        as_json: json,
      }))
    .then(() => _browser.close())
    .then(() => _db.pgp.end()),
);

export const scrapeFranchises = () => Rx
  .forkJoin([db$, browser$])
  .pipe(RxOp.mergeMap(projectRaw))
  .subscribe({
    next: () => console.log('Ok'),
    error: err => console.log(err),
    complete: () => console.log('Finished'),
  });
