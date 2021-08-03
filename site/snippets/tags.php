<?php
$tags = explode(", ", $tags);
$tags = array_map(fn($tag) => "tag-$tag", $tags);
echo implode(" ", $tags)
?>