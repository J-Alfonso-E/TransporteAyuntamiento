<?php

/**LOGGING ERRORS */
ini_set('display_errors', 1);
ini_set("log_errors",1);
ini_set("error_log", "/tmp/php-error.log");

/**REQUIERMENTS */

require_once 'controllers/routes.controller.php';

/**ROUTE CONTROLLER */
$index = new RouteController();
$index->index();