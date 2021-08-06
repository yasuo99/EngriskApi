export const WordClass = {
    VERB: 'Verb',
    NOUN: 'Noun',
    PRONOUN: 'Pronoun',
    ADJ: 'Adjective',
    ADV: 'Adverb',
    PREP: 'Preposition',
    CONJUNC: 'Conjunction',
    INTER: 'Interjection',
    TRANS: 'Transitive',
    INTRAN: 'Intransitive',
    PHRASALVERB: 'PhrasalVerb',
    PHRASALNOUN: 'PhrasalNoun'
}
export function mapClassToString(wordClass) {
    switch (wordClass) {
        case WordClass.NOUN:
            return 'Danh từ'
        case WordClass.VERB:
            return 'Động từ';
        case WordClass.PRONOUN:
            return 'Đại từ';
        case WordClass.ADJ:
            return 'Tính từ';
        case WordClass.ADV:
            return 'Trạng từ'
        case WordClass.PREP:
            return 'Thành phần';
        case WordClass.CONJUNC:
            return 'Từ nối'
        case WordClass.INTER:
            return 'Thán từ';
        case WordClass.TRANS:
            return 'Ngoại động từ';
        case WordClass.INTRAN:
            return 'Nội động từ';
        case WordClass.PHRASALVERB:
            return 'Cụm động từ'
    }
}
