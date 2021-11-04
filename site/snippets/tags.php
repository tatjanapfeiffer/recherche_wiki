<?php
$tags = explode(", ", $tags);
$tags = array_map(fn($tag) => "tag-" . Str::slug($tag), $tags);
echo implode(" ", $tags)
?>