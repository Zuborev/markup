<?php
include_once 'config.php';
if ((isset($_POST['name'])) && (isset($_POST['city'])) && (isset($_POST['area'])) && (isset($_POST['street'])) && (isset($_POST['house']))) {

    $name = $_POST['name'];
    $city = $_POST['city'];
    $area = $_POST['area'];
    $street = $_POST['street'];
    $house = $_POST['house'];
    $info = (empty($_POST['info'])) ? null : $_POST['info'];

    $result = [
        "messages" =>[],
        "error" =>0,
        ""
    ];

    $res = $dbh->prepare("INSERT INTO `adress`( `name`, `city`, `area`, `street`, `house`, `text_info`) VALUES (?, ?, ?, ?, ?, ?)");
    $data = $res->execute(array($name, $city, $area, $street, $house, $info));

    if ($data === true) {
        $result["messages"][] = 'Success! You saved your adress';
    } else {
        $result["error"] = 1;
        $result["messages"][] = 'Error! Check your details';
    }

    echo json_encode($result);

} else {
    $result["error"] = 1;
    $result["messages"][] = 'Error! Some fields are empty';
    echo json_encode($result);
}

