<?php
if ($_POST['name'] && $_POST['email'] && $_POST['phone'] && $_POST['message']) {
    mail(
        'jogarat367@marikuza.com',
        'Website form submission from `' . htmlspecialchars($_POST['fullName']) . ' (' . htmlspecialchars($_POST['email']) . ')',
        htmlspecialchars($_POST['phone']) . htmlspecialchars($_POST['message'])
    );
    header("HTTP/1.1 200 OK");
    echo 'Thank you, you for has been submitted';
} else {
    header("HTTP/1.1 500 Server Error");
    echo 'Please check your form submission';
}