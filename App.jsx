import { useState } from 'react';
import Random from 'random-util-js';

const modes = [
    { title: '2 Players', ranks: 8 },
    { title: '3 Players', ranks: 9, emperor: true },
    { title: '8 Characters, 4+ Players', ranks: 8, emperor: true },
    { title: '9 Characters, 4 Players', ranks: 9, emperor: true },
    { title: '9 Characters, 5+ Players', ranks: 9, emperor: true, queen: true },
];

export function App() {
    const [modeIndex, setModeIndex] = useState(2);
    const [choices, setChoices] = useState([]);

    function onChangeMode({ target: { value: mode } }) {
        setModeIndex(~~mode);
    }

    function onGenerate() {
        setChoices(random_choices(modes[modeIndex]));
    }

    return <>
        <div>
            <select value={modeIndex} onChange={onChangeMode}>
                {modes.map((mode, i) => <option key={i} value={i}>{mode.title}</option>)}
            </select>
            <button type="button" onClick={onGenerate}>Randomize</button>
        </div>
        {choices.map((choice, i) => <div key={i}>{choice}</div>)}
    </>;
}

const characters = [
    ['Assassin', 'Witch', 'Magistrate'],
    ['Thief', 'Spy', 'Blackmailer'],
    ['Magician', 'Wizard', 'Seer'],
    ['King', 'Patrician', 'Emperor'], // Emperor only in 3p+ games
    ['Bishop', 'Abbot', 'Cardinal'],
    ['Merchant', 'Alchemist', 'Trader'],
    ['Architect', 'Navigator', 'Scholar'],
    ['Warlord', 'Diplomat', 'Marshal'],
    ['Artist', 'Tax Collector', 'Queen'], // Queen only in 5p+ games
];

function random_choices(mode) {
    const choices = [];
    for (let i = 0; i < mode.ranks; i += 1) {
        const n =
            i === 3 && !mode.emperor ||
            i === 8 && !mode.queen ? 2 : 3;
        const rnd = Random.next(n);
        choices.push(characters[i][rnd]);
    }
    return choices;
}
