<?php

if (!empty($_POST)) {
    file_put_contents("audit.json", json_encode($_POST));
    echo json_encode($_POST);
}