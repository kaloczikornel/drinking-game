const axios = require('axios').default;
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);
const async = require('async');
const fs = require('fs');

const INITIAL = 'INITIAL';
const START_OPEN = 'START';
const START_P = 'START_P';
const START_CLOSE = 'START_CLOSE';
const END_OPEN = 'END_OPEN';
const BACKSLASH = 'BACKSLASH';
const END_P = 'END_P';

async function main() {
    let sentences = [];
    try {
        const response = await axios.get(
            'https://www.scarymommy.com/lifestyle/truth-or-drink-questions'
        );
        let i = 0;
        let state = INITIAL;
        let sentence = '';
        for (const s of response.data) {
            switch (state) {
                case INITIAL:
                    if (s === '<') {
                        state = START_OPEN;
                    }
                    break;
                case START_OPEN:
                    if (s === 'p') {
                        state = START_P;
                    } else {
                        state = INITIAL;
                    }
                    break;
                case START_P:
                    if (s === '>') {
                        state = START_CLOSE;
                    } else {
                        state = INITIAL;
                    }
                    break;
                case START_CLOSE:
                    if (s === '<') {
                        state = END_OPEN;
                    } else {
                        sentence = sentence.concat(s);
                    }
                    break;
                case END_OPEN:
                    if (s === '/') {
                        state = BACKSLASH;
                    } else {
                        state = INITIAL;
                    }
                    break;
                case BACKSLASH:
                    if (s === 'p') {
                        state = END_P;
                    } else {
                        state = INITIAL;
                    }
                    break;
                case END_P:
                    state = INITIAL;
                    sentence = sentence.slice(3);
                    if (sentence[0] === ' ') {
                        sentence = sentence.slice(1);
                    }
                    sentences.push(sentence);
                    sentence = '';
                    break;
                default:
                    break;
            }
        }
        fs.writeFile('test.txt', JSON.stringify(sentences), (err) => {
            if (err) {
                console.error(err);
            }
        });
        console.log(sentences);
    } catch (e) {
        console.log(e);
    }
}

main();
