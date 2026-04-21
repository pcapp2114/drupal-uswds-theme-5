# LIEP Introduction Module Quiz

A custom Drupal module that renders a React-powered quiz about Language Instruction Educational Programs (LIEPs), with per-question feedback, a pass/fail result screen, and a printable certificate of completion.

## URLs

- Quiz: `/liep-quiz`
- Certificate (shown on pass): `/liep-quiz/certificate`

## Installation

Enable the module:

```
drush en liep_quiz -y
drush cr
```

## Editing questions

All quiz content lives in the `QUESTIONS` array at the top of `js/liep_quiz.js`. Each entry:

```js
{
  id: 1,
  prompt: 'Question text?',
  choices: ['A', 'B', 'C', 'D'],
  answer: 0,                      // index of the correct choice (0-based)
  choiceFeedback: [               // optional, one message per choice
    'Feedback for choice 0',
    'Feedback for choice 1',
    'Feedback for choice 2',
    'Feedback for choice 3',
  ],
  explanation: 'Fallback text used when choiceFeedback is omitted.',
}
```

Passing the quiz requires a perfect score. Hard-refresh the browser after edits; run `drush cr` if you have asset aggregation enabled.

## Tech notes

- React 18 is loaded as UMD from unpkg; no build step is required.
- Module machine name: `liep_quiz`.
