import * as four_letter_words from '../data/four_letter_words.json';
import * as five_letter_words from '../data/five_letter_words.json';
import * as six_letter_words from '../data/six_letter_words.json';

const getWordHelper = (obj, curLetters, word, depth = 3) => {
    if (depth === 0) {
        if (obj.includes(word)) {
            return true
        }
        return false
    }
    if (curLetters[0] in obj) {
        return getWordHelper(obj[curLetters[0]], curLetters.slice(1), word, depth - 1)
    } else {
        return false;
    }
}

const validWord = (word) => {
    let obj;
    if (word.length === 4) obj = four_letter_words;
    if (word.length === 5) obj = five_letter_words;
    if (word.length === 6) obj = six_letter_words;
    return getWordHelper(obj, word, word, 3);
}

export {
    validWord
}