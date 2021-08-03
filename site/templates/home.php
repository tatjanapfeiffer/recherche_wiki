<?php
/** @var Kirby\Cms\Site $site */
$alleTags = $site->index()->pluck("tags", ",", true);
?>

<?php snippet('header') ?>
<div class="header">
  <div class="title">Verhaltensbeeinflussende Gestaltung</div>
  <div class="Suche-box">
    <input class="Suche">
      <span class="material-icons aktiv" id="search-btn">search</span>
    </input>
  </div>
</div>


<div class="content">
  <div class="sidebar">
    <div id="filter-minimize">
      <div id="close-filter-box">Close</div>
      <div id="open-filter-box">Open</div>
    </div>  
    <div class="filter-box">
      <button class="alle-button aktiv filter-button">Alle</button>
      <?php foreach($alleTags as $tag): ?>
        <button class="filter-button" data-tag="<?= $tag ?>"><?= $tag ?></button>
      <?php endforeach ?>
    </div>
  </div>

  <div class="begriffe">
    <div class="no-results-info">No results</div>
    <?php foreach($site->children()->filterBy('intendedTemplate', 'begriff')->sortBy('title') as $begriff): ?>
      <div
        id="begriff-<?= $begriff->slug() ?>"
        class="begriff <?php snippet('tags', ['tags' => $begriff->tags()]) ?>"
      >
        <div class="definitions-box">
          <h2 class="begriff-titel"><?= $begriff->title() ?></h2>
          <div class="begriff-definition"><?= str_replace('&nbsp;', ' ', $begriff->definition()) ?></div>
        </div>
        <div class="beispiele">
          <?php foreach($begriff->children() as $beispiel): ?>
            <div
              id="begriff-<?= $begriff->slug() ?>-beispiel-<?= $beispiel->slug() ?>"
              class="beispiel <?php snippet('tags', ['tags' => $beispiel->tags()]) ?>"
            >
              <h3><?= $beispiel->title() ?></h3>
              <div class="beispiel-text"><?= str_replace('&nbsp;', ' ', $beispiel->text()) ?></div>
              <div class="beispiel-bilder">
                <?php foreach($beispiel->files() as $bild): ?>
                  <img class="beispiel-bild img-fit lozad" data-src="<?= $bild->url() ?>" />
                <?php endforeach ?>
              </div class="link">
              <?= $beispiel->links() ?>
            </div>
          <?php endforeach ?>
        </div>
      </div>
    <?php endforeach ?>
  </div>
</div>

<?php snippet('footer') ?>
