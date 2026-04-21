(function (Drupal, React, ReactDOM) {
  'use strict';

  const h = React.createElement;
  const { useState } = React;

  const QUESTIONS = [
    {
      id: 1,
      prompt: '1. What is the primary goal of Language Instruction Educational Programs LIEPs?',
      choices: [
        'To replace academic instruction with language instruction',
        'To support English learners in developing English proficiency while achieving academic success',
        'To teach English learners only in their home language',
        'To prepare students for standardized assessment',
      ],
      answer: 1,
      choiceFeedback: [
        'This is incorrect because no LIEP replaces academic instruction with language instruction.',
        'The answer is to support English learners in developing English proficiency while achieving academic success.',
        'This is incorrect because one of the goals of LIEPs is to develop English proficiency.',
        'This is incorrect because while LIEPs may contribute to successful assessment performance, it is not their primary goal.',
      ],
    },
   

 {
      id: 2,
  prompt: '2. Does the Federal law require the use of LIEPs?',
      choices: [
        'Yes',
        'No',
        'It Depends on the needs of SEAs/LEAs',
      ],
      answer: 0,
      choiceFeedback: [
        'Yes, Federal law does require the use of LIEPs',
        'This is incorrect because the use of LIEPs is required by laws.',
        'This is incorrect because the law requires implementation of LIEPs for ELs regardless of SEA or LEA context.',
      ],
    },


  {
      id: 3,
  prompt: '3. Which of the following is the most commonly implemented LIEP type?',
      choices: [
        'Dual Language',
        'Transitional Bilingual',
        'ESL/ELD or Content Based with ESL Support',
        'All of the above',
      ],
      answer: 2,
      choiceFeedback: [
        'This is incorrect because according to national data this is not the most commonly implemented LIEP.',
        'This is incorrect because according to national data this is not the most commonly implemented LIEP.',
        'ESL/ELD or Content Based with ESL Support.',
        'This is incorrect because only ESL programs are the most commonly implemented LIEPs.',
      ],
    },


  ];

  function Quiz() {
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [locked, setLocked] = useState(false);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);

    const q = QUESTIONS[index];

    function choose(i) {
      if (locked) return;
      setSelected(i);
      setLocked(true);
      if (i === q.answer) setScore(score + 1);
    }

    function next() {
      if (index + 1 >= QUESTIONS.length) {
        setDone(true);
        return;
      }
      setIndex(index + 1);
      setSelected(null);
      setLocked(false);
    }

    function restart() {
      setIndex(0);
      setSelected(null);
      setLocked(false);
      setScore(0);
      setDone(false);
    }

    if (done) {
      const passed = score === QUESTIONS.length;
      return h('div', { className: 'rq-card quiz-box' },
        h('h2', { className: 'rq-complete-text' }, 'Quiz complete'),
        h('p', {
          className: 'rq-result ' + (passed ? 'rq-result-pass' : 'rq-result-fail'),
          role: 'status',
        }, passed ? 'Congratulations, you passed!' : 'Sorry, you did not pass.'),
        h('p', { className: 'rq-score' }, `You scored ${score} of ${QUESTIONS.length}.`),
        passed && h('p', { className: 'rq-actions rq-actions-pass' },
          h('a', {
            className: 'rq-btn rq-btn-primary rq-cert-link',
            href: '/liep-quiz/certificate',
            target: '_blank',
            rel: 'noopener',
          }, 'View and print your certificate'),
          h('button', { className: 'rq-btn rq-btn-secondary', onClick: restart }, 'Take the quiz again')
        ),
        !passed && h('button', { className: 'rq-btn rq-btn-try', onClick: restart }, 'Try again')
      );
    }

    const isCorrect = selected === q.answer;

    return h('div', { className: 'rq-card quiz-box' },
      h('div', { className: 'rq-progress' }, `Question ${index + 1} of ${QUESTIONS.length}`),
      h('h2', { className: 'rq-prompt' }, q.prompt),
      h('ul', { className: 'rq-choices', role: 'radiogroup' },
        q.choices.map((choice, i) => {
          let cls = 'rq-choice';
          if (locked && i === q.answer) cls += ' rq-choice-correct';
          else if (locked && i === selected) cls += ' rq-choice-wrong';
          else if (selected === i) cls += ' rq-choice-selected';
          return h('li', { key: i },
            h('button', {
              type: 'button',
              role: 'radio',
              'aria-checked': selected === i,
              className: cls,
              disabled: locked,
              onClick: () => choose(i),
            }, choice)
          );
        })
      ),
      locked && h('div', {
        className: 'rq-feedback ' + (isCorrect ? 'rq-feedback-correct' : 'rq-feedback-wrong'),
        role: 'status',
      },
        h('strong', null, isCorrect ? 'Correct!' : 'Not quite.'),
        ' ',
        (q.choiceFeedback && q.choiceFeedback[selected]) || q.explanation
      ),
      h('div', { className: 'rq-actions' },
        h('button', {
          className: 'rq-btn rq-btn-next',
          disabled: !locked,
          onClick: next,
        }, index + 1 === QUESTIONS.length ? 'Finish' : 'Next question')
      )
    );
  }

  Drupal.behaviors.reactQuiz = {
    attach(context) {
      const root = context.querySelector
        ? context.querySelector('#liep-quiz-root')
        : document.getElementById('liep-quiz-root');
      if (!root || root.dataset.rqMounted === '1') return;
      root.dataset.rqMounted = '1';
      ReactDOM.createRoot(root).render(h(Quiz));
    },
  };
})(Drupal, React, ReactDOM);
