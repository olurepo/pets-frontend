export const BACKEND_URL = 'http://localhost:8080/';

export enum PredictionOutcome {
    PASS = 'pass',
    FAIL ='fail'
}

export enum Prediction {
    ENTAILMENT = 'Entailment',
    CONTRADICTION ='Contradiction',
    NEUTRAL ='Neutral'
}

export enum SyntacticRelation {
    DIRECT_OBJECTS = 'DIRECT_OBJECTS',
    NOUN_MODIFIERS = 'NOUN_MODIFIERS',
    POSESSIVE_PRONOUNS = 'POSESSIVE_PRONOUNS',
    AUXILIARY_VERB = 'AUXILIARY_VERB',
    PREPOSITIONS = 'PREPOSITIONS',
    COREFERENT = 'COREFERENT',
    UNKNOWN = 'UNKNOWN'
}

export const SyntacticRelationColorMap = {
    rcmod: '#FFBF00', // Amber
    poss: '#E52B50', // Amaranth
    pcomp: '#9966CC', // Amethyst
    partmod: '#7FFFD4', // Aquamarine
    nsubjpass: '#007FFF', // Azure
    auxpass: '#000000', // Black
    UNKNOWN: '#FFFFFF', // White
    iobj: '#993300', // Brown
    discourse: '#007BA7', // Cerulean
    prep: '#7FFF00', // Chartreuse green
    ccomp: '#FF4500', // Orange-red
    neg: '#008001', // Green
    nn: '#FF00AF', // Magenta rose
    prt: '#000080', // Navy Blue
    xcomp: '#808000', // Olive
    conj: '#40826D', // Viridian
    cop: '#800000', // Maroon
    quantmod: '#FFFF00', // Yellow
    possessive: '#008080', // Teal
    num: '#F7E7CE', // Champagne
    advmod: '#FA8072', // Salmon
    pobj: '#A7FC00', // Spring bud
    aux: '#A7FC00', // Spring bud
    mark: '#A7FC00', // Spring bud
    mwe: '#A7FC00', // Spring bud
    amod: '#A7FC00', // Spring bud
    advcl: '#A7FC00', // Spring bud
    det: '#A7FC00', // Spring bud
    dep: '#A7FC00', // Spring bud
};

export enum AnimalSize {
    SMALL='Small',
    MEDIUM='Medium',
    LARGE='Large',
}
