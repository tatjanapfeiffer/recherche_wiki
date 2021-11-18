<?php
/** @var Kirby\Cms\Site $site */
$alleTags = $site->index()->pluck("tags", ",", true);
?>

<?php snippet('header') ?>
<div class="header">
  <div class="title">the good/bad side</div>

  <div class="Suche-box">
    <input class="Suche" class="material-icons aktiv" placeholder="Search...">
    </input>
  </div>
</div>
<!-- <div class="heat-map-wrapper">
  <div class="heat-map"></div>
</div> -->
<div class="profile">
  <div class="profile-image"></div>
  <div class="name"></div>
</div>



<div class="content">
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="hamburger wackel" id="open-filter-box">>></div>
      <div class="hamburger wackel" id="close-filter-box"><<</div>
      <div class="filter-box">
        <button class="alle-button aktiv filter-button wackel">Alle</button>
        <?php foreach($alleTags as $tag): ?>
          <button class="filter-button wackel" data-tag="<?= $tag ?>"><?= $tag ?></button>
        <?php endforeach ?>
      </div>
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
