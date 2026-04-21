<?php

namespace Drupal\liep_quiz\Controller;

use Drupal\Core\Controller\ControllerBase;

class LiepQuizController extends ControllerBase {

  public function page(): array {
    return [
      '#type' => 'container',
      '#attributes' => ['id' => 'liep-quiz-root'],
      '#attached' => ['library' => ['liep_quiz/quiz']],
    ];
  }

  public function certificate(): array {
    return [
      '#type' => 'container',
      '#attributes' => ['class' => ['rq-cert-page']],
      '#attached' => ['library' => ['liep_quiz/certificate']],
      'cert' => [
        '#type' => 'inline_template',
        '#template' => <<<'TWIG'
<div class="rq-cert">
  <div class="rq-cert-inner">
    <div class="rq-cert-eyebrow">Certificate of Completion</div>
    <h1 class="rq-cert-title">You Passed!</h1>
    <p class="rq-cert-body">This certificate is awarded in recognition of successfully completing the LIEP Introduction Module Quiz with a perfect score.</p>
    <div class="rq-cert-seal" aria-hidden="true">&#10004;</div>
    <div class="rq-cert-footer">LIEP Introduction Module Quiz &middot; Issued {{ date }}</div>
  </div>
</div>
<p class="rq-cert-actions"><button type="button" onclick="window.print()" class="rq-btn rq-btn-primary">Print certificate</button></p>
TWIG,
        '#context' => [
          'date' => date('F j, Y'),
        ],
      ],
    ];
  }

}
